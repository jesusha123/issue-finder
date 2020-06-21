import React from 'react';
import './App.css';
import IssueTable from './IssueTable'
import { Octokit } from '@octokit/rest'


const octokit = new Octokit();

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      authors: [
        "BenTheElder",
        "liggitt",
        "dims",
        "Huang-Wei",
        "saad-ali",
        "verult"
      ]
    };

    this.handleAuthorInput = this.handleAuthorInput.bind(this);
  }

  handleAuthorInput(event) {
    let authors = event.target.value.split(",")
    this.refreshIssues(authors)
  }

  refreshIssues(authors) {
    let base_parms = [
      "repo:kubernetes/kubernetes",
      "is:issue",
      "is:open",
      "no:assignee"
    ]

    const q = base_parms.join(" ") + " " + authors.map(a => "author:"+a).join(" ")

    octokit.search
      .issuesAndPullRequests({ q })
      .then(({ data }) => {
        console.log(data)
        let issues = data.items.map((item) => ({ 
          number: item.number,
          title: item.title,
          author: item.user.login,
          labels: item.labels.map(l => ({ 
            id: l.id, 
            name: l.name,
            color: l.color
          })),
          date: item.created_at,
          link: "https://github.com/kubernetes/kubernetes/issues/"+item.number,
        }))

        this.setState({
          issues: issues,
          authors: authors
        });
      });
  }

  componentDidMount() {
    this.refreshIssues(this.state.authors)
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Authors" value={this.state.authors} onChange={this.handleAuthorInput} />
        <IssueTable issues={this.state.issues} />
      </div>
    );
  }
}

export default App;

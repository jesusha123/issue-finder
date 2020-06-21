import React from 'react';
import './IssueTable.css';
import { Octokit } from '@octokit/rest'
import IssueRow from './IssueRow';

class IssueTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: []
    };
  }

  componentDidMount() {
    const octokit = new Octokit();

    let base_parms = [
      "repo:kubernetes/kubernetes",
      "is:issue",
      "is:open",
      "no:assignee"
    ]
    let authors = [
      "BenTheElder",
      "liggitt",
      "dims",
      "Huang-Wei",
      "saad-ali",
      "verult"
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
          issues: issues
        });
      });
  }

  render() {
    const listItems = this.state.issues.map((issue) => 
      <IssueRow key={issue.number} issue={issue} />
    );

    return (
      <table>
        <thead>
          <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Labels</th>
            <th>Date</th>
          </tr>
       </thead>
       <tbody>
         {listItems}
       </tbody>
      </table>
    );
  }
}

export default IssueTable;

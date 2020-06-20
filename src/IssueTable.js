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
    const q = "repo:kubernetes/kubernetes is:issue is:open no:assignee author:BenTheElder";
    octokit.search
      .issuesAndPullRequests({ q })
      .then(({ data }) => {
        console.log(data)
        let issues = data.items.map((item) => { 
          return {
            number: item.number,
            title: item.title,
            author: item.user.login,
            labels: item.labels.map((l) => {return l.name}).join(" "),
            date: item.created_at,
          } 
        })

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

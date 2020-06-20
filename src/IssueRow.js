import React from 'react';

function IssueRow(props) {
  return (
    <tr>
      <td><a href={props.issue.link}>{props.issue.number}</a></td>
      <td>{props.issue.title}</td>
      <td>{props.issue.author}</td>
      <td>{props.issue.labels}</td>
      <td>{props.issue.date}</td>
    </tr>
  );
}

export default IssueRow;

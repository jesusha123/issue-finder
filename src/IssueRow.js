import React from 'react';

function IssueRow(props) {
  return (
    <tr>
      <td>{props.issue.number}</td>
      <td>{props.issue.title}</td>
      <td>{props.issue.author}</td>
      <td>{props.issue.labels}</td>
      <td>{props.issue.date}</td>
    </tr>
  );
}

export default IssueRow;

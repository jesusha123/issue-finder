import React from 'react';
import LabelCell from './LabelCell';

function IssueRow(props) {
  let assignee = '';
  if(props.issue.assignee) {
    assignee = props.issue.assignee.login;
  }

  return (
    <tr>
      <td><a href={props.issue.link}>{props.issue.number}</a></td>
      <td>{props.issue.title}</td>
      <td>{props.issue.author}</td>
      <LabelCell labels={props.issue.labels} />
      <td>{props.issue.comments}</td>
      <td>{assignee}</td>
      <td>{props.issue.date}</td>
      <td>{props.issue.updated_at}</td>
    </tr>
  );
}

export default IssueRow;

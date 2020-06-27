import React from 'react';
import LabelCell from './LabelCell';

function IssueRow(props) {
  let issue = props.issue;
  let assignee = '';
  if(issue.assignee) {
    assignee = issue.assignee.login;
  }

  let deltaDaysNoUpdate = Math.ceil((issue.updated_at - issue.date) / (1000*60*60*24));

  return (
    <tr>
      <td><a href={issue.link}>{issue.number}</a></td>
      <td>{issue.title}</td>
      <td>{issue.author}</td>
      <LabelCell labels={issue.labels} />
      <td>{issue.comments}</td>
      <td>{assignee}</td>
      <td>{issue.date.toLocaleString()}</td>
      <td>{issue.updated_at.toLocaleString()}</td>
      <td>{deltaDaysNoUpdate}</td>
    </tr>
  );
}

export default IssueRow;

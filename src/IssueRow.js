import React from 'react';
import LabelCell from './LabelCell';

function IssueRow(props) {
  return (
    <tr>
      <td><a href={props.issue.link}>{props.issue.number}</a></td>
      <td>{props.issue.title}</td>
      <td>{props.issue.author}</td>
      <LabelCell labels={props.issue.labels} />
      <td>{props.issue.date}</td>
    </tr>
  );
}

export default IssueRow;

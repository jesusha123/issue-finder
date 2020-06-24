import React from 'react';
import './IssueTable.css';
import IssueRow from './IssueRow';

class IssueTable extends React.Component {
  render() {
    const listItems = this.props.issues.map((issue) => 
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
            <th>Comments</th>
            <th>Date</th>
            <th>Last Update</th>
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

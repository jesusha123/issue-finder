import React from 'react';
import './App.css';
import IssueTable from './IssueTable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
    };
  }

  render() {
    let authors = [
      "BenTheElder",
      "liggitt",
      "dims",
      "Huang-Wei",
      "saad-ali",
      "verult"
    ]

    return (
      <div className="App">
        <input class="form-control" type="text" placeholder="Authors"></input>
        <IssueTable authors={authors} />
      </div>
    );
  }
}

export default App;

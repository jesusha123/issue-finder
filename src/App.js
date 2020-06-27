import React from 'react';
import './App.css';
import IssueTable from './IssueTable'
import SearchControls from './SearchControls';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: []
    };

    this.handleIssueChange = this.handleIssueChange.bind(this);
  }

  handleIssueChange(issues) {
    this.setState({issues: issues});
  }

  render() {
    return (
      <div className="App">
        <SearchControls handleIssueChange={this.handleIssueChange} />
        <IssueTable issues={this.state.issues} />
      </div>
    );
  }
}

export default App;

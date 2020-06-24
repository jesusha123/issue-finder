import React from 'react';
import './App.css';
import IssueTable from './IssueTable'
import findIssues from './IssueFinder'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      helpWantedLabel: false,
      authors: ''
    };

    this.handleAuthorInput = this.handleAuthorInput.bind(this);
    this.handleHelpWantedChange = this.handleHelpWantedChange.bind(this);
    this.clearAuthors = this.clearAuthors.bind(this);
  }

  handleAuthorInput(event) {
    console.log(event.target.value)
    let authors = event.target.value;

    this.setState({
      authors: authors
    }, () => { this.refreshIssues(this.state) });
  }

  handleHelpWantedChange(event) {
    console.log("Incoming state: " + event.target.checked);
    this.setState({
      helpWantedLabel: event.target.checked
    }, () => { this.refreshIssues(this.state) });
  }

  clearAuthors() {
    this.setState({
      authors: ''
    }, () => { this.refreshIssues(this.state) });
  }

  refreshIssues(state) {
    console.log("Current state: " + state.helpWantedLabel);
    findIssues(state, (issues) => {
      this.setState({
        issues: issues
      });
    })
  }

  componentDidMount() {
    this.refreshIssues(this.state)
  }

  render() {
    return (
      <div className="App">
        <label htmlFor="authorsInput">Authors</label>
        <input type="text" id="authorsInput" placeholder="Authors" value={this.state.authors} onChange={this.handleAuthorInput} />
        <button onClick={this.clearAuthors}>Clear Authors</button>
        <input type="checkbox" value="" id="helpWantedCheckbox" onChange={this.handleHelpWantedChange} checked={this.state.helpWantedLabel} />
        <label htmlFor="helpWantedCheckbox">Help Wanted</label>
        <IssueTable issues={this.state.issues} />
      </div>
    );
  }
}

export default App;

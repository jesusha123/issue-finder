import React from 'react';
import './App.css';
import IssueTable from './IssueTable'
import findIssues from './IssueFinder'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      issues: [],
      authors: [
        "BenTheElder",
        "liggitt",
        "dims",
        "Huang-Wei",
        "saad-ali",
        "verult"
      ]
    };

    this.handleAuthorInput = this.handleAuthorInput.bind(this);
  }

  handleAuthorInput(event) {
    let authors = event.target.value.split(",")

    this.setState({
      authors: authors
    }, this.refreshIssues(this.state));
  }

  handleHelpWantedChange(event) {
    console.log("Changing help wanted")
  }

  refreshIssues(state) {
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
        <input type="checkbox" value="" id="helpWantedCheckbox" onChange={this.handleHelpWantedChange} />
        <label htmlFor="helpWantedCheckbox">Help Wanted</label>
        <IssueTable issues={this.state.issues} />
      </div>
    );
  }
}

export default App;

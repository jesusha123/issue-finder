import React from 'react';
import findIssues from './IssueFinder'

class SearchControls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      helpWantedLabel: false,
      unassigned: true,
      authors: '',
      repo: 'kubernetes/kubernetes'
    };

    this.handleAuthorInput = this.handleAuthorInput.bind(this);
    this.handleHelpWantedChange = this.handleHelpWantedChange.bind(this);
    this.handleUnassignedChange = this.handleUnassignedChange.bind(this);
    this.handleRepositoryChange = this.handleRepositoryChange.bind(this);
    this.clearAuthors = this.clearAuthors.bind(this);
  }

  handleAuthorInput(event) {
    let authors = event.target.value;

    this.setState({
      authors: authors
    }, () => { this.refreshIssues(this.state) });
  }

  handleHelpWantedChange(event) {
    this.setState({
      helpWantedLabel: event.target.checked
    }, () => { this.refreshIssues(this.state) });
  }

  handleUnassignedChange(event) {
    this.setState({
      unassigned: event.target.checked
    }, () => { this.refreshIssues(this.state) });
  }

  handleRepositoryChange(event) {
    this.setState({
      repo: event.target.value
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
      this.props.handleIssueChange(issues);
    })
  }

  componentDidMount() {
    this.refreshIssues(this.state)
  }

  render() {
    return (
      <div className="SearchControls">
        <label htmlFor="repoInput">Repository</label>
        <input type="text" id="repoInput" placeholder="Repository" value={this.state.repo} onChange={this.handleRepositoryChange} />

        <label htmlFor="authorsInput">Authors</label>
        <input type="text" id="authorsInput" placeholder="Authors" value={this.state.authors} onChange={this.handleAuthorInput} />
        <button onClick={this.clearAuthors}>Clear Authors</button>

        <input type="checkbox" value="" id="helpWantedCheckbox" onChange={this.handleHelpWantedChange} checked={this.state.helpWantedLabel} />
        <label htmlFor="helpWantedCheckbox">Help Wanted</label>

        <input type="checkbox" value="" id="unassignedCheckbox" onChange={this.handleUnassignedChange} checked={this.state.unassigned} />
        <label htmlFor="unassignedCheckbox">Unassigned</label>
      </div>
    );
  }
}

export default SearchControls;
/* eslint-disable react/prop-types */
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchType: 'internet',
    };
    this.onSearchType = this.onSearchType.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
  }

  onSearchType(e) {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  }

  onSearchSubmit(e) {
    e.preventDefault();
    const { searchTerm } = this.state;
    const { getSearchResults } = this.props;
    e.target.reset();
    getSearchResults(searchTerm);
  }

  render() {
    return (
      <div>
        <p>Search for a game:</p>
        <form onSubmit={this.onSearchSubmit}>
          <input type="text" placeholder="Search" onChange={this.onSearchType} />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Search;

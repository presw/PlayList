/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import List from './List';
import Search from './Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      wishlist: [],
      searchResults: [],
      view: 'library',
    };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.clickAddToLibrary = this.clickAddToLibrary.bind(this);
    this.clickAddToWishList = this.clickAddToWishList.bind(this);
  }

  componentDidMount() {
    axios.get('/library')
      .then((response) => {
        const games = response.data;
        const library = [];
        const wishlist = [];
        for (let i = 0; i < games.length; i += 1) {
          const game = games[i];
          if (game.owned) {
            library.push(game);
          } else {
            wishlist.push(game);
          }
        }
        this.setState({ library, wishlist });
      })
      .catch((error) => console.log(error));
  }

  getSearchResults(searchTerm) {
    console.log('APP', searchTerm);
    axios.get(`/api/search/${searchTerm}`)
      .then((response) => {
        const searchResults = response.data;
        this.setState({ searchResults, view: 'searchResults' });
      });
  }

  clickAddToLibrary(game) {
    // do stuff
    axios.post('/api/library/addGame', game)
      .then((response) => {
        // do some stuff with the response
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickAddToWishList() {
    // do other stuff
    axios.post('/api/wishlist/addGame')
      .then((response) => {
        // do some stuff with the response
      });
  }

  // How to render three views?
  // start on search page
  render() {
    const {
      library,
      wishlist,
      searchResults,
      view,
    } = this.state;
    let display = library;
    if (view === 'wishlist') {
      display = wishlist;
    } else if (view === 'searchResults') {
      display = searchResults;
    }
    console.log(library);
    // const display = games;
    return (
      <div>
        <h1>Play List</h1>
        <Search getSearchResults={this.getSearchResults} />
        <List games={display} view={view} clickAddToLibrary={this.clickAddToLibrary} />
      </div>
    );
  }
}

export default App;

/* eslint-disable class-methods-use-this */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import List from './List';
import Search from './Search';
import GameDetail from './GameDetail';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: [],
      wishlist: [],
      searchResults: [],
      gameDetail: null,
      view: 'library',
    };
    this.getSearchResults = this.getSearchResults.bind(this);
    this.clickAddToLibrary = this.clickAddToLibrary.bind(this);
    this.clickAddToWishList = this.clickAddToWishList.bind(this);
    this.displayLibrary = this.displayLibrary.bind(this);
    this.displayWishlist = this.displayWishlist.bind(this);
    this.clickCover = this.clickCover.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
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
    axios.post('/api/library/addGame', game)
      .then((response) => {
      })
      .catch((error) => {
        console.log(error);
      });
  }

  clickAddToWishList(game) {
    axios.post('/api/wishlist/addGame', game)
      .then((response) => {
      });
  }

  clickCover(game) {
    this.setState({ view: 'gameDetail', gameDetail: game });
    this.componentDidMount();
  }

  displayLibrary() {
    this.setState({ view: 'library' });
    this.componentDidMount();
  }

  displayWishlist() {
    this.setState({ view: 'wishlist' });
    this.componentDidMount();
  }

  render() {
    const {
      library,
      wishlist,
      searchResults,
      view,
      gameDetail,
    } = this.state;
    let display = library;
    if (view === 'wishlist') {
      display = wishlist;
    } else if (view === 'searchResults') {
      display = searchResults;
    }
    return (
      <div>
        <div className="list-header">
          <h1>Play List</h1>
          <div className="category-button add-to button" onClick={this.displayLibrary}>My Library</div>
          <div className="category-button add-to button" onClick={this.displayWishlist}>My Wishlist</div>
        </div>
        {view === 'gameDetail' ? (
          <GameDetail gameDetail={gameDetail} />
        ) : (
          <div>
            <div className="list-header">
              <Search getSearchResults={this.getSearchResults} />
            </div>
            <div>
              <List games={display} view={view} clickCover={this.clickCover} clickAddToWishList={this.clickAddToWishList} clickAddToLibrary={this.clickAddToLibrary} />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

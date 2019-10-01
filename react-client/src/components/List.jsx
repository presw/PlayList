/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import gamesProp from '../../types/index';

const List = (props) => {
  const { games, clickAddToLibrary, clickAddToWishList, clickCover, view } = props;
  let location = 'your library';
  let title = 'Library';
  if (view === 'wishlist') {
    location = 'your wishlist';
    title = 'Wishlist';
  } else if (view === 'searchResults') {
    location = 'the search results';
    title = 'Search Results';
  }
  return (
    <div>
      <h4> {title} </h4>
      There are { games.length } games in {location}.
      <div id="games-container">
        { games.map((game) => <ListItem key={game.id} view={view} game={game} clickCover={clickCover} clickAddToWishlist={clickAddToWishList} clickAddToLibrary={clickAddToLibrary} />)}
      </div>
    </div>
  );
};

List.propTypes = {
  games: PropTypes.arrayOf(gamesProp),
};

export default List;

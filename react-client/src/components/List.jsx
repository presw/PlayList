/* eslint-disable react/prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import gamesProp from '../../types/index';

const List = (props) => {
  const { games, clickAddToLibrary } = props;
  return (
    <div>
      <h4> List Component </h4>
      There are { games.length } games.
      <div id="games-container">
        { games.map((game) => <ListItem key={game.id} game={game} clickAddToLibrary={clickAddToLibrary} />)}
      </div>
    </div>
  );
};

List.propTypes = {
  games: PropTypes.arrayOf(gamesProp),
};

export default List;

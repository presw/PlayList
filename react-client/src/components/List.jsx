/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

const List = (props) => {
  const { items } = props;
  return (
    <div>
      <h4> List Component </h4>
      There are { items.length } items.
      { items.map((item) => <ListItem item={item} />)}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.string.isRequired,
};

export default List;

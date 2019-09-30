import React from 'react';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  const { item } = props;
  return (
    <div>
      { item.description }
    </div>
  );
};

ListItem.propTypes = {
  item: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ListItem;

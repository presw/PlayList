/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/require-default-props */
import React from 'react';
import gamesProp from '../../types';

const ListItem = (props) => {
  const {
    game,
    clickAddToLibrary,
    clickAddToWishlist,
    clickCover,
    view,
  } = props;
  const { cover } = game;
  let coverURL;
  if (cover) {
    coverURL = cover.image_url;
  }
  return (
    <div className="preview-container">
      <div className="cover-container">
        { game.name }
        {view === 'searchResults'
          ? (
            <div className="add-buttons-field">
              <div className="add-to-library-button add-to" onClick={() => clickAddToLibrary(game)}>Add to Library</div>
              <div className="add-to-wishlist-button add-to" onClick={() => clickAddToWishlist(game)}>Add to Wishlist</div>
            </div>
          ) : null}
        <div className="image-container" onClick={() => clickCover(game)}>
          {coverURL ? <img src={coverURL} alt="game cover" /> : <div>No Cover</div>}
        </div>
      </div>
    </div>
  );
};

ListItem.propTypes = {
  game: gamesProp,
};

export default ListItem;

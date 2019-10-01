/* eslint-disable react/prop-types */
import React from 'react';

const GameDetail = (props) => {
  const { gameDetail } = props;
  const {
    cover,
    name,
    screenshots,
    summary,
    total_rating,
    websites,
  } = gameDetail;

  return (
    <div className="game-detail-container">
      <div className="title">
        <h1>{name}</h1>
        {total_rating ? (
          <p>Rating: {total_rating.toFixed(2)}</p>
        ) : (
          <div />
        )}
      </div>
      <div className="cover-photo-container">
        <img src={cover.image_url} />
      </div>
      <div>
        <p>{summary}</p>
      </div>
      <div>
        {screenshots.map((screenshot) => <img src={screenshot.image_url} key={screenshot.id} />)}
      </div>
      <div>
        {websites.map((website) => <div key={website.id}>{website.url}</div>)}
      </div>
    </div>
  );
};

export default GameDetail;

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
          <p>No rating available</p>
        )}
      </div>
      <div className="cover-summary-container">
        <div className="cover-container">
          <img src={cover.image_url} alt="cover" />
        </div>
        <div className="summary-container">
          <p>{summary}</p>
        </div>
      </div>
      <div>
        {screenshots.map((screenshot) => <img src={screenshot.image_url} key={screenshot.id} alt="screenshot" />)}
      </div>
      <div>
        {websites.map((website) => <div key={website.id}>{website.url}</div>)}
      </div>
    </div>
  );
};

export default GameDetail;

/* eslint-disable no-console */
const express = require('express');
const axios = require('axios');
const games = require('../database-mongo');
const config = require('../config');

const port = 3000;
const app = express();
const gamesHost = 'https://api-v3.igdb.com/games/';

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/library', (req, res) => {
  games.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/api/search/:searchTerm', (req, res) => {
  const { searchTerm } = req.params;
  const query = `fields category,collection.name,cover.image_id,name,screenshots.image_id,slug,storyline,summary,total_rating,version_parent,websites.url,platforms.abbreviation; search "${searchTerm}";`;
  const headers = { 'user-key': config.igdbKey };
  axios.get(gamesHost, {
    headers,
    data: query,
  })
    .then((response) => {
      const { data } = response;
      for (let i = 0; i < data.length; i += 1) {
        const game = data[i];
        const { screenshots, cover, artwork } = game;
        if (cover) {
          const coverURL = `http://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.jpg`;
          game.cover.image_url = coverURL;
        }
        if (typeof screenshots !== 'undefined') {
          for (let j = 0; j < screenshots.length; j += 1) {
            const screenshot = screenshots[j];
            const screenshotURL = `http://images.igdb.com/igdb/image/upload/t_screenshot_big/${screenshot.image_id}.jpg`
            screenshot.image_url = screenshotURL;
          }
        }
        if (typeof artwork !== 'undefined') {
          for (let k = 0; k < artwork.length; k += 1) {
            const artworkImage = artwork[k];
            const artworkURL = `http://images.igdb.com/igdb/image/upload/t_screenshot_big/${artworkImage.image_id}.jpg`
            artworkImage.image_url = artworkURL;
          }
        }
      }
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post('/api/library/addGame', (req, res) => {
  const game = req.body;
  game.owned = true;
  games.insert(game, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post('/api/wishlist/addGame', (req, res) => {
  const game = req.body;
  game.owned = false;
  games.insert(game, (err, data) => {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

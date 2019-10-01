/* eslint-disable no-console */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true,
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('openUri', () => {
  console.log('mongoose connected successfully');
});

const gameSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
  owned: Boolean,
  category: Number,
  series: {
    id: Number,
    name: String,
  },
  cover: {
    id: Number,
    image_id: String,
    image_url: String,
  },
  name: String,
  platforms: [
    {
      id: Number,
      abbreviation: String,
    },
  ],
  screenshots: [
    {
      id: Number,
      image_id: String,
      image_url: String,
    },
  ],
  artwork: [
    {
      id: Number,
      image_id: String,
      image_url: String,
    },
  ],
  slug: String,
  summary: String,
  total_rating: Number,
  version_parent: {
    id: Number,
    summary: String,
  },
  websites: [
    {
      id: Number,
      url: String,
    },
  ],
});

const Game = mongoose.model('Game', gameSchema);

const selectAll = (callback) => {
  Game.find({}, (err, games) => {
    if (err) {
      callback(err, null);
    }
    callback(null, games);
  });
};

const insertAll = (gamesArray, callback) => {
  Game.insertMany(gamesArray, (err, games) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    callback(null, games);
  });
};

const insert = (game, callback) => {
  const gameInsert = new Game(game);
  gameInsert.save(game, (err, res) => {
    if (err) {
      console.log(err);
      callback(err, null);
    }
    callback(null, res);
  });
};

module.exports = {
  selectAll,
  insertAll,
  insert,
};

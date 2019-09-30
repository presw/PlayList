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
  id: Number,
  owned: Boolean,
  category: Number,
  series: {
    id: Number,
    name: String,
  },
  cover: {
    id: Number,
    image_id: String,
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
    },
  ],
  artwork: [
    {
      id: Number,
      image_id: String,
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
    } else {
      callback(null, games);
    }
  });
};

module.exports.selectAll = selectAll;

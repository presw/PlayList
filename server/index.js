/* eslint-disable no-console */
const express = require('express');
const items = require('../database-mongo');

const port = 3000;
const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

const task = require('../routes/api/task');
const milestone = require('../routes/api/milestone');
const calendar = require('../routes/api/calendar');

const error = require('../middleware/error');

module.exports = function(app) {
  if (process.env.NODE_ENV == 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    });
  }

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  app.use('/api/task', task);
  app.use('/api/milestone', milestone);
  app.use('/api/calendar', calendar);

  app.use(error);
}
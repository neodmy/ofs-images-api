const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { startRoutes } = require('./routes/index');
const { yamlParserStart } = require('./lib/yamlParser');
const { webcamSchedulerStart } = require('./lib/webcamScheduler');

const start = () => {
  const app = express();
  app.use(express.static('src/public'));
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  const config = yamlParserStart('src/config/endpoints.yaml');
  webcamSchedulerStart(config);
  startRoutes(app, config);

  app.use((err, req, res, next) => {
    res.status(err.HTTPCode || 500);
    res.send(err.errorMessage || 'Server internal error');
  });


  return app;
};

module.exports = {
  startApp: start,
};

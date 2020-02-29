const express = require('express');
const { join, dirname } = require('path');

const { webcamState } = require('../lib/webcamScheduler');
const createError = require('../lib/error');
const fileChecker = require('../lib/fileChecker');

const router = express.Router();


module.exports = (config) => {
  router.get('/status', (req, res, next) => {
    const response = {
      ...webcamState,
    };
    if (!Object.entries(response).length) next(createError('Status not available', 500));
    else res.send(response);
  });

  config.images.routes.forEach(({ endpoint, file }) => {
    router.get(endpoint, (req, res, next) => {
      const filePath = join(dirname(require.main.filename), '/public/', file);
      if (fileChecker(filePath)) res.sendFile(filePath);
      else next(createError('File not available', 404));
    });
  });

  return router;
};

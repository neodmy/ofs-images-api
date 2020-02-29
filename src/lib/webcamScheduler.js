const fs = require('fs');
const { CronJob } = require('cron');
const { spawn } = require('child_process');

const logger = require('../lib/logger');

const state = {};

const scheduledImages = (endpoint, command, arguments) => {
  const cronJob = new CronJob('*/30 * * * * *', () => {
    try {
      spawn(command, arguments).on('exit', (code, signal) => {
        state[endpoint] = code === 0;
      });
    } catch (err) {
      logger.error(err);
    }
  });
  cronJob.start();
};

const start = (config) => {
  logger.info('Scheduler init');
  config.images.routes.forEach(({ endpoint, command, arguments }) => {
    state[endpoint] = false;
    scheduledImages(endpoint, command, arguments);
  });
  logger.info('Scheduler loaded');
};

module.exports = {
  webcamSchedulerStart: start,
  webcamState: state,
};

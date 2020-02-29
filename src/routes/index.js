const logger = require('../lib/logger');

const routes = require('./routes');
const imagesRouter = require('./images');


const start = (app, config) => {
  logger.info('Init routes');
  app.use(routes.images, imagesRouter(config));
  logger.info('routes loaded');
};

module.exports = {
  startRoutes: start,
};

const http = require('http');

const logger = require('./lib/logger');
const { startApp } = require('./app');

const port = process.env.PORT || 5003;

const start = async () => {
  try {
    const app = startApp();
    app.set('port', port);
    const server = http.createServer(app);
    await server.listen(port);
    logger.info(`Server listening on port ${port}`);
  } catch (error) {
    logger.error(`Error starting system: ${error.message}`);
    process.exit(1);
  }
};

start();

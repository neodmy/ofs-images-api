const fs = require('fs');
const yaml = require('js-yaml');
const logger = require('../lib/logger');

const start = (configFilePath) => {
  logger.info('Config init');
  const configFile = yaml.safeLoad(fs.readFileSync(configFilePath));
  logger.info('Config loaded');
  return configFile;
};

module.exports = {
  yamlParserStart: start,
};

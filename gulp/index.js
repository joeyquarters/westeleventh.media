const { audio } = require('./audio');
const { build } = require('./build');
const { deployAudio, deploySite } = require('./deploy');
const { setup } = require('./setup');

module.exports = {
  audio,
  build,
  deployAudio,
  deploySite,
  setup
};

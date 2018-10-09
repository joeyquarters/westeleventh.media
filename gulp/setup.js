'use strict';

const gutil = require('gulp-util');
const { exec } = require('child_process');

/**
 * Task: setup
 * Set up the local environment with dependencies; assumes homebrew is
 * installed on a Mac
 */
function setup(cb) {
  const brewDeps = [
    'awscli',
    'ffmpeg --with-libvorbis'
  ];
  const brewInstallCmd = `brew install ${brewDeps.join(' ')}`;

  return exec(brewInstallCmd, (error, stdout, stderr) => {
    if (error) {
      gutil.log(gutil.colors.magenta(`exec error: ${error}`));
      return cb(error);
    }

    gutil.log(stdout);
    gutil.log(gutil.colors.magenta(stderr));
    cb();
  });
};

module.exports = { setup };

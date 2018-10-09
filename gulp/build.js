'use strict';

const gutil = require('gulp-util');
const { exec } = require('child_process');

/**
 * Task: build
 * Build our site for production
 */
function build(cb) {
  const buildCommand = 'JEKYLL_ENV=production bundle exec jekyll build';
  exec(buildCommand, (error, stdout, stderr) => {
    if (error) {
      gutil.log(gutil.colors.magenta(`exec error: ${error}`));
      return cb(error);
    }

    gutil.log(stdout);
    gutil.log(gutil.colors.magenta(stderr));
    cb()
  });
};

module.exports = { build };

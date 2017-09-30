'use strict';

const gutil = require('gulp-util');
const { exec } = require('child_process');

module.exports = (gulp) => {

  /**
   * Task: build
   * Build our site for production
   */
  gulp.task('build', () => {
    const buildCommand = 'JEKYLL_ENV=production bundle exec jekyll build';
    exec(buildCommand, (error, stdout, stderr) => {
      if (error) {
        gutil.log(gutil.colors.magenta(`exec error: ${error}`));
        return;
      }

      gutil.log(stdout);
      gutil.log(gutil.colors.magenta(stderr));
    });
  });

};

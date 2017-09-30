'use strict';

const { exec } = require('child_process');
const gutil = require('gulp-util');

module.exports = (gulp) => {

  /**
   * Sync the site (_site/) with the S3 bucket
   */
  gulp.task('deploy:site', () => {
    const command = 'aws s3 sync _site/ s3://www.westeleventh.media/';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        gutil.log(gutil.colors.magenta(`exec error: ${error}`));
        return;
      }

      gutil.log(stdout);
      gutil.log(gutil.colors.magenta(stderr));
    });
  });

  /**
   * Sync the _audio/final folder with the S3 bucket
   */
  gulp.task('deploy:audio', () => {
    const command = 'aws s3 sync _audio/final/ s3://episodes.westeleventh.media/ --acl \'public-read\'';
    exec(command, (error, stdout, stderr) => {
      if (error) {
        gutil.log(gutil.colors.magenta(`exec error: ${error}`));
        return;
      }

      gutil.log(stdout);
      gutil.log(gutil.colors.magenta(stderr));
    });
  });

};

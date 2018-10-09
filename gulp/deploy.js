'use strict';

const { exec } = require('child_process');
const gutil = require('gulp-util');

/**
 * Sync the site (_site/) with the S3 bucket
 */
function deploySite(cb) {
  const command = 'aws s3 sync _site/ s3://www.westeleventh.media/';
  return exec(command, (error, stdout, stderr) => {
    gutil.log(stdout);
    gutil.log(gutil.colors.magenta(stderr));
    cb(error);
  });
};

/**
 * Sync the _audio/final folder with the S3 bucket
 */
function deployAudio(cb) {
  const command = 'aws s3 sync _audio/final/ s3://episodes.westeleventh.media/ --acl \'public-read\'';
  return exec(command, (error, stdout, stderr) => {
    gutil.log(stdout);
    gutil.log(gutil.colors.magenta(stderr));
    cb(error);
  });
};

module.exports = { deployAudio, deploySite };

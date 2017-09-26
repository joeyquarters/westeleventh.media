const gulp = require('gulp');
const gutil = require('gulp-util');
const child = require('child_process');

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['serve', '--watch']);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

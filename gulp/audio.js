'use strict';

const { readdirSync } = require('fs');
const path = require('path');
const ffmpeg = require('gulp-fluent-ffmpeg');
const runSequence = require('run-sequence');

/**
 * Grab an array of audio files that have not been converted
 * @return Array
 */
const audioToConvert = () => {
  const toConvert = readdirSync('_audio/')
    .filter((file) => path.extname(file) == '.aac');

  const converted = readdirSync('_audio/final')
    .filter((file) => ['.m4a', '.ogg'].indexOf(path.extname(file)) !== -1);
  
  const convertedNames = converted.map((file) => {
    return path.parse(file).name;
  });

  return toConvert.filter((file) => {
    const fileName = path.parse(file).name;
    return convertedNames.indexOf(fileName) === -1;
  });
};

module.exports = (gulp) => {

  /**
   * Convert audio files to .m4a, move to final folder
   */
  gulp.task('audio:convert-m4a', () => {
    const filesArray = audioToConvert();
    gulp.src(filesArray)
      .pipe(ffmpeg('m4a'))
      .pipe(gulp.dest('_audio/final'));
  });

  /**
   * Convert audio files to .ogg, move to final folder
   */
  gulp.task('audio:convert-ogg', () => {
    const filesArray = audioToConvert();
    gulp.src(filesArray)
      .pipe(ffmpeg('ogg', (cmd) => {
        return cmd
          .audioCodec('libvorbis');
      }))
      .pipe(gulp.dest('_audio/final'));
  });

  /**
   * Main audio conversion task
   */
  gulp.task('audio:convert', () => {
    return runSequence(
      'audio:convert-m4a',
      'audio:convert-ogg'
    );
  });
};

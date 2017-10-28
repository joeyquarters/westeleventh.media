'use strict';

const { readdirSync, existsSync } = require('fs');
const path = require('path');
const ffmpeg = require('gulp-fluent-ffmpeg');
const runSequence = require('run-sequence');

/**
 * Get a list of files in the _audio/ folder that need to be converted
 * @param String extname Which extension to check if converted
 * @return Array  An array of filenames w/ extension
 */
const getFilesToConvert = (extname = 'm4a') => {
  const files = readdirSync('_audio/')
    .filter((file) => path.extname(file) == '.aac');

  const toConvert = files.filter((file) => {
    const fileName = path.parse(file).name;
    const oggExists = existsSync(`_audio/final/${fileName}.${extname}`);

    if (!oggExists) {
      return true;
    }
  }).map((file) => `_audio/${file}`);

  return toConvert;
};

module.exports = (gulp) => {

  /**
   * Convert audio files to .m4a, move to final folder
   */
  gulp.task('audio:convert-aac', () => {
    const toConvert = getFilesToConvert('m4a');
    // @TODO
  });

  /**
   * Convert audio files to .ogg, move to final folder
   */
  gulp.task('audio:convert-ogg', () => {
    const toConvert = getFilesToConvert('ogg');
    return gulp.src(toConvert)
      .pipe(ffmpeg('ogg', (cmd) => {
        return cmd
          .audioChannels(2)
          .audioCodec('libvorbis');
      }))
      .pipe(gulp.dest('_audio/final'));
  });

  /**
   * Main audio conversion task
   */
  gulp.task('audio', () => {
    return runSequence(
      'audio:convert-m4a',
      'audio:convert-ogg'
    );
  });
};

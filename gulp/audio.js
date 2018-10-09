'use strict';

const { readdirSync, existsSync } = require('fs');
const { dest, src } = require('gulp');
const path = require('path');
const ffmpeg = require('gulp-fluent-ffmpeg');

/**
 * Get a list of files in the _audio/ folder that need to be converted
 * @param String extname Which extension to check if converted
 * @return Array  An array of filenames w/ extension
 */
function getFilesToConvert (extname = 'm4a') {
  const files = readdirSync('_audio/')
    .filter((file) => path.extname(file) == '.aac');

  const toConvert = files.filter((file) => {
    const fileName = path.parse(file).name;
    const fileExists = existsSync(`_audio/final/${fileName}.${extname}`);

    if (!fileExists) {
      return true;
    }
  }).map((file) => `_audio/${file}`);

  return toConvert;
};

/**
 * Convert audio files to .ogg, move to final folder
 */
function audio() {
  const toConvert = getFilesToConvert('ogg');

  if (toConvert.length === 0) {
    return Promise.resolve();
  }

  return src(['_audio/final/'])
    .pipe(ffmpeg('ogg', (cmd) => {
      return cmd
        .audioChannels(2)
        .audioCodec('libvorbis');
    }))
    .pipe(dest('_audio/final'));
};

module.exports = { audio };

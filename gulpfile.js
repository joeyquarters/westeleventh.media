const gulp = require('gulp');
const loadGulpTasks = require('load-gulp-tasks');

const options = {
  pattern: 'gulp/**/*.js'
};

/**
 * Initialize our Gulp tasks
 */
loadGulpTasks(gulp, options);

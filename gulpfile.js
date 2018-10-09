const { series } = require('gulp');

const tasks = require('./gulp');

exports.audio = tasks.audio;
exports.build = tasks.build;
exports.setup = tasks.setup;
exports.deploy = series(tasks.deploySite, tasks.deployAudio);

exports.default = build;

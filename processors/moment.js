'use strict';

// Dependencies
const moment = require('moment')

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    files.forEach(function(file) {
      if (file.date) {
        file.date = moment(file.date)
      }
    })
  }
}

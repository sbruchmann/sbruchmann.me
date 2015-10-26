'use strict';

const extend = require('deep-extend')
const extract = require('extract-values')
const isMatch = require('micromatch').isMatch

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    let options = aldous.get('processors.extractPathData')
    let patterns = Object.keys(options)

    setImmediate(done)
    files.forEach(function(file) {
      patterns.forEach(function(pattern) {
        if (isMatch(file.path, pattern)) {
          extend(file, extract(file.path, options[pattern]))
        }
      })
    })
  }
}

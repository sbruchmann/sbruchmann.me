'use strict';

// Dependencies
const defaults = require('deep-defaults')
const isMatch = require('micromatch').isMatch

module.exports = function setup() {
  return function(files, aldous, done) {
    let options = aldous.get('plugins.defaults')
    let patterns = Object.keys(options)

    setImmediate(done)
    files.forEach(function(file, index) {
      patterns.forEach(function(pattern) {
        if (isMatch(file.path, pattern)) {
          files[index] = defaults(file, options[pattern])
        }
      })
    })
  }
}

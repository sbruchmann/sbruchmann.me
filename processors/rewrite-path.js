'use strict';

// Dependencies
const isMatch = require('micromatch').isMatch

module.exports = function setup() {
  return function(files, aldous, done) {
    let options = aldous.get('processors.rewritePath')
    let patterns = Object.keys(options)

    setImmediate(done)
    files.forEach(function(file) {
      patterns.forEach(function(pattern) {
        if (isMatch(file.path, pattern)) {
          file.path = options[pattern].call(null, file)
        }
      })
    })
  }
}

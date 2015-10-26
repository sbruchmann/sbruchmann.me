'use strict';

// Dependencies
const extname = require('path').extname
const postcss = require('postcss')

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    let processors = aldous.get('plugins.postcss')

    // Note: This site has only one stylesheet,
    // so we optimize for that
    for (let file of files) {
      if (extname(file.path) !== '.css') continue
      postcss(processors)
        .process(file.source.toString())
        .then(function(result) {
          file.source = new Buffer(result.css)
          done()
        })
        .catch(done)
    }
  }
}

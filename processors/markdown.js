'use strict';

// Dependencies
const markdown = require('markdown-it')

module.exports = function setup() {
  let md = markdown()
  let mdExt = /\.md$/

  return function(files, aldous, done) {
    setImmediate(done)
    files.forEach(function(file) {
      if (mdExt.test(file.path)) {
        file.path = file.path.replace(mdExt, '.html')
        file.source = new Buffer(md.render(file.source.toString()))
      }
    })
  }
}

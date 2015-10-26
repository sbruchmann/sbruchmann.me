'use strict';

// Dependencies
const extend = require('deep-extend')
const matter = require('gray-matter')

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    setImmediate(done)
    files.forEach(function(file) {
      if (/\.md$/.test(file.path)) {
        let fm = matter(file.source.toString())
        file.source = new Buffer(fm.content.trim())
        extend(file, fm.data)
      }
    })
  }
}

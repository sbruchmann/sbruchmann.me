'use strict';

// Dependencies
const path = require('path')

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    setTimeout(done)
    files.forEach(function(file) {
      let dirname = null

      if (!/\.html$/.test(file.path) || file.permalink === false) return
      if (file.path === 'index.html') return

      dirname = path.dirname(file.path)
      if (dirname === '.') {
        dirname = file.path.split('.')[0]
      }

      file.path = path.join(dirname, 'index.html')
    })
  }
}

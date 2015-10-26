'use strict';

// Dependencies
const extend = require('deep-extend')
const join = require('path').join
const swig = require('swig')

module.exports = function setup() {
  return function plugin(files, aldous, done) {
    let ext = '.html'
    let locals = extend({}, aldous.get('globals', {}))
    let tplDir = aldous.get('paths.templates')
    let tpl = null

    setImmediate(done)
    files.forEach(function(file) {
      if (file.template) {
        tpl = join(tplDir, file.template) + ext
        locals.document = file
        file.source = new Buffer(swig.renderFile(tpl, locals))
      }
    })
  }
}

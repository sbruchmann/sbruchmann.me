'use strict';

const Aldous = require('aldous')
const fs = require('fs')
const fsUtils = require('./fs')
const config = require('./config')
const path = require('path')
const readdir = require('recursive-readdir')

let build = Aldous(config)

/**
 * Read source files
 *
 * Creates a new `source` property on source file objects that contains the
 * source of the corresponding file.
 */
build.use(function readSourceFile(files, aldous, done) {
  let src = aldous.get('paths.source')

  setImmediate(done)
  files.forEach(function(file) {
    // TODO: Read source files asynchronously
    file.source = fs.readFileSync(path.join(src, file.path))
  })
})

fsUtils.readSourceDir(config.paths.source)
  .then(function(input) {
    return build.run(input)
  })
  .then(function callback(response) {
    return fsUtils.writeOutput(config.paths.destination, response[0])
  })
  .then(function callback() {
    console.log('Done.')
  })
  .catch(console.error)

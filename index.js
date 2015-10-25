'use strict';

const Aldous = require('aldous')
const fs = require('fs')
const fsUtils = require('./fs')
const config = require('./config')
const path = require('path')
const readdir = require('recursive-readdir')

let build = Aldous(config)

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

'use strict';

// Dependencies
const Aldous = require('aldous')
const fs = require('./fs')
const config = require('./config')

// Setup
let build = Aldous(config)
let dest = config.paths.destination
let src = config.paths.source

// Do ya thing!
fs.readSourceDir(src)
  .then(function(input) { return build.run(input) })
  .then(function cb(response) { return fs.writeOutput(dest, response[0]) })
  .then(function cb() { console.log('Done.') })
  .catch(console.error)

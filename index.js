'use strict';

// Dependencies
const Aldous = require('aldous')
const fs = require('./fs')
const config = require('./config')
const path = require('path')
const processors = require('./processors')

// Setup
let build = Aldous(config)
let dest = config.paths.destination
let src = config.paths.source

build
  .use(processors.frontMatter())
  .use(processors.extractPathData())
  .use(processors.defaults())
  .use(processors.markdown())
  .use(processors.permalinks())
  .use(processors.templates())
  .use(processors.postcss())

// Do ya thing!
fs.readSourceDir(src)
  .then(function(input) { return build.run(input) })
  .then(function cb(response) { return fs.writeOutput(dest, response[0]) })
  .catch(function(err) { console.error(err.stack) })

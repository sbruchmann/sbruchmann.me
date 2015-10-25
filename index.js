'use strict';

// Dependencies
const Aldous = require('aldous')
const fs = require('./fs')
const config = require('./config')
const markdown = require('markdown-it')

// Setup
let build = Aldous(config)
let dest = config.paths.destination
let src = config.paths.source

build
  // Render markdown files as HTML
  .use(function(files, aldous, done) {
    let md = markdown()
    let mdExt = /\.md$/

    setImmediate(done)
    files.forEach(function(file) {
      if (mdExt.test(file.path)) {
        file.path = file.path.replace(mdExt, '.html')
        file.source = new Buffer(md.render(file.source.toString()))
      }
    })
  })

// Do ya thing!
fs.readSourceDir(src)
  .then(function(input) { return build.run(input) })
  .then(function cb(response) { return fs.writeOutput(dest, response[0]) })
  .then(function cb() { console.log('Done.') })
  .catch(console.error)

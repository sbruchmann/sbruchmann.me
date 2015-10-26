'use strict';

// Dependencies
const Aldous = require('aldous')
const extend = require('deep-extend')
const fs = require('./fs')
const config = require('./config')
const markdown = require('markdown-it')
const matter = require('gray-matter')
const path = require('path')
const swig = require('swig')

// Setup
let build = Aldous(config)
let dest = config.paths.destination
let src = config.paths.source

build
  // Parse front matter of markdown documents
  .use(function(files, aldous, done) {
    setImmediate(done)
    files.forEach(function(file) {
      if (/\.md$/.test(file.path)) {
        let fm = matter(file.source.toString())
        file.source = new Buffer(fm.content.trim())
        extend(file, fm.data)
      }
    })
  })

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

  // Render template for HTML files
  .use(function(files, aldous, done) {
    let globals = aldous.get('globals', {})
    let tpl = path.join(config.paths.templates, 'layout.html')

    setImmediate(done)
    files.forEach(function(file) {
      if (/\.html$/.test(file.path)) {
        file.source = new Buffer(swig.renderFile(tpl, {
          document: file,
          globals: globals
        }))
      }
    })
  })

// Do ya thing!
fs.readSourceDir(src)
  .then(function(input) { return build.run(input) })
  .then(function cb(response) { return fs.writeOutput(dest, response[0]) })
  .then(function cb() { console.log('Done.') })
  .catch(console.error)

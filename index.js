'use strict';

// Dependencies
const Aldous = require('aldous')
const defaults = require('deep-defaults')
const extend = require('deep-extend')
const fs = require('./fs')
const config = require('./config')
const isMatch = require('micromatch').isMatch
const markdown = require('markdown-it')
const matter = require('gray-matter')
const path = require('path')
const postcss = require('postcss')
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

  // Apply default properties to source files
  .use(function(files, aldous, done) {
    let options = aldous.get('plugins.defaults')
    let patterns = Object.keys(options)

    setImmediate(done)
    files.forEach(function(file, index) {
      patterns.forEach(function(pattern) {
        if (isMatch(file.path, pattern)) {
          files[index] = defaults(file, options[pattern])
        }
      })
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

  // Render template for files
  .use(function(files, aldous, done) {
    let ext = '.html'
    let locals = extend({}, aldous.get('globals', {}))
    let tplDir = config.paths.templates
    let tpl = null

    setImmediate(done)
    files.forEach(function(file) {
      if (file.template) {
        tpl = path.join(tplDir, file.template) + ext
        locals.document = file
        file.source = new Buffer(swig.renderFile(tpl, locals))
      }
    })
  })

  // Process stylesheets with PostCSS
  // Note: This site has only one stylesheet,
  // so we optimize for that
  .use(function(files, aldous, done) {
    let processors = aldous.get('plugins.postcss')

    for (let file of files) {
      if (path.extname(file.path) !== '.css') continue
      postcss(processors)
        .process(file.source.toString())
        .then(function(result) {
          file.source = new Buffer(result.css)
          done()
        })
        .catch(done)
    }
  })

// Do ya thing!
fs.readSourceDir(src)
  .then(function(input) { return build.run(input) })
  .then(function cb(response) { return fs.writeOutput(dest, response[0]) })
  .then(function cb() { console.log('Done.') })
  .catch(console.error)

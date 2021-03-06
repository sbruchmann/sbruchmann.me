'use strict';

// Dependencies
const cssnano = require('cssnano')
const cssnext = require('cssnext')
const moment = require('moment')
const path = require('path')

// Aliases
let basedir = __dirname
let env = process.env.NODE_ENV || 'development'
let postcssProcessors = [cssnext()]

// Minify CSS in production
if (env === 'production') {
  postcssProcessors.push(cssnano())
}

module.exports = {
  env: env,

  paths: {
    destination: path.join(basedir, 'dist'),
    source: path.join(basedir, 'src'),
    templates: path.join(basedir, 'templates')
  },

  processors: {
    defaults: {
      '*.md': {
        kind: 'page',
        template: 'page'
      },
      'posts/**/*.md': {
        kind: 'post',
        permalink: false,
        template: 'post'
      }
    },
    extractPathData: {
      'posts/**/*.md': 'posts/{category}/{date}--{slug}.md'
    },
    rewritePath: {
      'posts/**/*.md': function(file) {
        return ['blog', file.category, file.slug + '.html'].join('/')
      }
    },
    postcss: postcssProcessors
  },

  globals: {
    buildDate: moment(),
    env: env,
    site: {
      title: 'Steffen Bruchmann’s Website'
    }
  }
}

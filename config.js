'use strict';

// Dependencies
const cssnext = require('cssnext')
const path = require('path')

// Aliases
var basedir = __dirname

module.exports = {
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
    postcss: [
      cssnext()
    ]
  },

  globals: {
    site: {
      title: 'Steffen Bruchmann’s Website'
    }
  }
}

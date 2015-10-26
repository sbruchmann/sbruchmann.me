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

  plugins: {
    defaults: {
      '*.md': {
        kind: 'page',
        template: 'page'
      },
      'posts/**/*.md': {
        kind: 'post',
        template: 'post'
      }
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

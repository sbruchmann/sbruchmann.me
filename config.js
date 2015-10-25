'use strict';

// Dependencies
const path = require('path')

// Aliases
var basedir = __dirname

module.exports = {
  paths: {
    destination: path.join(basedir, 'dist'),
    source: path.join(basedir, 'src'),
    templates: path.join(basedir, 'templates')
  }
}

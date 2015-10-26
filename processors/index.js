'use strict';

const basename = require('path').basename

module.exports = require('to-exports')(__dirname, {
  renameKey: function renameKey(path) {
    return basename(path)
      .toLowerCase()
      .replace(/\.js$/, '')
      .replace(/-(.)/g, function replace(match, group1) {
        return group1.toUpperCase()
      })
  }
});

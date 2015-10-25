'use strict';

const Aldous = require('aldous')
const fs = require('fs')
const path = require('path')
const readdir = require('recursive-readdir')

function readSourceDir(dir) {
  return new Promise(function resolver(resolve, reject) {
    readdir(dir, function callback(err, contents) {
      if (err) return reject(err)
      resolve(contents.map(function(file) {
        return {
          path: path.relative(dir, file)
        }
      }))
    })
  })
}

readSourceDir(__dirname + '/src')
  .then(function(input) {
    return Aldous().run(input)
  })
  .then(function callback(response) {
    console.log('output', response[0])
  })
  .catch(console.error)

'use strict';

const Aldous = require('aldous')
const fs = require('fs')
const path = require('path')
const readdir = require('recursive-readdir')

let build = Aldous({
  paths: {
    source: path.join(__dirname, 'src')
  }
})

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

readSourceDir(build.get('paths.source'))
  .then(function(input) {
    return build.run(input)
  })
  .then(function callback(response) {
    console.log('output', response[0])
  })
  .catch(console.error)

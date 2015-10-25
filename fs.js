'use strict';

// Dependencies
const fs = require('fs-extra')
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

function writeOutput(destDir, output) {
  return new Promise(function resolver(resolve, reject) {
    fs.remove(destDir, function removeCb(err) {
      if (err) return reject(err)

      output.forEach(function(file) {
        let dest = path.join(destDir, file.path)

        // TODO: Use asynchronous file I/O
        fs.mkdirpSync(path.dirname(dest))
        fs.writeFileSync(dest, file.source)
      })
    })
  })
}

module.exports = {
  readSourceDir: readSourceDir,
  writeOutput: writeOutput
}

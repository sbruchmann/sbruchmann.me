'use strict';

const Aldous = require('aldous')
const fs = require('fs-extra')
const path = require('path')
const readdir = require('recursive-readdir')

let build = Aldous({
  paths: {
    destination: path.join(__dirname, 'dist'),
    source: path.join(__dirname, 'src')
  }
})

/**
 * Read source files
 *
 * Creates a new `source` property on source file objects that contains the
 * source of the corresponding file.
 */
build.use(function readSourceFile(files, aldous, done) {
  let src = aldous.get('paths.source')

  setImmediate(done)
  files.forEach(function(file) {
    // TODO: Read source files asynchronously
    file.source = fs.readFileSync(path.join(src, file.path))
  })
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

function writeOutput(output) {
  let destDir = build.get('paths.destination')

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

readSourceDir(build.get('paths.source'))
  .then(function(input) {
    return build.run(input)
  })
  .then(function callback(response) {
    return writeOutput(response[0])
  })
  .then(function callback() {
    console.log('Done.')
  })
  .catch(console.error)

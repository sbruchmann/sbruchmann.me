'use strict';

const Aldous = require('aldous')

Aldous()
  .run([], function callback(err, output) {
    if (err) throw err
    console.log(output)
  })

'use strict'

var pakoDeflate = require('pako/lib/deflate.js')
var pakoInflate = require('pako/lib/inflate.js')
var encode64 = require('./encode64')
var decode64 = require('./decode64')

// 1. decode using a transformation close to base64
// 2. decompress using Deflate algorithm
// 3. Encode in UTF-8
//
module.exports.decode = function (text) {
  return pakoInflate.inflate(
    decode64.decode(text),
    { to: 'string' }
  )
}

// 1. Encode in UTF-8
// 2. Compress using Deflate algorithm
// 3. Reencode using a transformation close to base64

module.exports.encode = function (text) {
  return encode64.encode(
    pakoDeflate.deflate(
      text,
      { level: 9, to: 'string' }
    )
  )
}

var util = require('util'),
    crypto = require('crypto'),
    Stream = require('stream');

var HashingStream = exports.HashingStream = function (hash) {
  this.hash = crypto.createHash(hash);
  this.writable = true;

  Stream.call(this);
};
util.inherits(HashingStream, Stream);

HashingStream.prototype.write = function (data) {
  this.emit('data', data);
  this.hash.update(data);
};

HashingStream.prototype.end = function (data) {
  if (data) {
    this.write(data);
  }
  this.emit('end', this.hash);
};

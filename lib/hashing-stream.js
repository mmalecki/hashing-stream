var util = require('util'),
    crypto = require('crypto'),
    Stream = require('stream');

module.exports = function (hash) {
  return new HashingStream(hash);
};

var HashingStream = module.exports.HashingStream = function (hash) {
  this.hash = crypto.createHash(hash);

  this.paused = false;
  this.readable = true;
  this.writable = true;

  Stream.call(this);
};
util.inherits(HashingStream, Stream);

HashingStream.prototype.write = function (data) {
  this.emit('data', data);
  this.hash.update(data);

  return !this.paused;
};

HashingStream.prototype.end = function (data) {
  if (data) {
    this.write(data);
  }
  this.emit('end', this.hash);
};

HashingStream.prototype.destroy = function () {
  delete this.hash;
};

HashingStream.prototype.pause = function () {
  this.paused = true;
};

HashingStream.prototype.resume = function () {
  this.paused = false;
  this.emit('drain');
};

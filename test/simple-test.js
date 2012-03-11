var test = require('tap').test,
    HashingStream = require('../').HashingStream;

test('HashingStream', function (t) {
  t.plan(1);

  var h = new HashingStream('sha1');

  h.on('end', function (hash) {
    t.equal(hash.digest('hex'), '4cde2f21d48b012ce70be442081da6ff43ade3ef');
  });

  h.write('hello');
  h.write('i know');
  h.end('nodejitsu');
});

var fs = require('fs'),
    path = require('path'),
    test = require('tap').test,
    HashingStream = require('../').HashingStream;

test('HashingStream with file input', function (t) {
  t.plan(1);

  fs.createReadStream(path.join(__dirname, 'fixtures', 'fillerama.txt'))
    .pipe(new HashingStream('sha1'))
    .on('end', function (hash) {
      t.equal(hash.digest('hex'), '65f3bd7e5bed93ebef9fb5338d9b9a19deb5c2d5');
    });
});

var chai = require('chai'),
filesExist = require('../lib/files-exist');

describe("filesExist", function() {
  it('should return an empty array when called with an empty array', function() {
    var fileArray = [],
    resultArray = filesExist(fileArray);
    chai.expect(fileArray).to.deep.equal(resultArray);
  });

  it('should throw an exception for a missing file', function() {
    var fileArray = ['foo.bar'];
    chai.expect(filesExist.bind(filesExist, fileArray)).to.throw('A required file is missing: foo.bar');
  });

  it('should return an identical array for existing files', function() {
    var fileArray = ['package.json', 'test/tests.js', 'lib/files-exist.js'],
    resultArray = filesExist(fileArray);
    chai.expect(fileArray).to.deep.equal(resultArray);
  });

  it('should return an array without the missing files when throwOnMissing is false', function() {
    var fileArray = ['package.json', 'test/tests.js', 'foo.bar', 'lib/files-exist.js'],
    expectedArray = ['package.json', 'test/tests.js', 'lib/files-exist.js'],
    resultArray = filesExist(fileArray, { throwOnMissing: false });
    chai.expect(expectedArray).to.deep.equal(resultArray);
  });

  it('should allow changing the exception message', function() {
    var fileArray = ['foo.bar'],
    options = { exceptionMessage: 'This is an exception' };
    chai.expect(filesExist.bind(filesExist, fileArray, options)).to.throw('This is an exception: foo.bar');
  });

  it('should ignore missing globs by default', function() {
    var fileArray = ['lib/*.png'],
    resultArray = filesExist(fileArray);
    chai.expect(fileArray).to.deep.equal(resultArray);
  });

  it('should throw error when empty glob is requested to be checked', function() {
    var fileArray = ['lib/*.png'],
    options = { checkGlobs: true };
    chai.expect(filesExist.bind(filesExist, fileArray, options)).to.throw('A required file is missing: lib/*.png');
  });

});
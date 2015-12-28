# files-exist
This simple tool accepts an array of filenames with or without globbing wildcards and returns an identical array if all the filenames point to existing files on the file system.

[![Build Status](https://travis-ci.org/Kaivosukeltaja/files-exist.svg?branch=master)](https://travis-ci.org/Kaivosukeltaja/files-exist)

Basic usage:
```javascript
var filesExist = require('files-exist'),
files = filesExist(['package.json', 'node_modules/express/lib/express.js']);
```

## Usage in unit testing
You can use `files-exist`in your unit tests. Simply pass an array of files you want to exist and either check for errors or disable them and compare the array returned.
```javascript
var chai = require('chai'),
filesExist = require('files-exist');

describe('images', function() {
  it('should contain at least one .png file', function() {
    var fileArray = ['images/*.png'];
    
    // Method one: pass a bound call and check for thrown errors
    chai.expect(filesExist.bind(filesExist, fileArray, { checkGlobs: true })).to.not.throw(Error);
    
    // Method two: suppress errors and check the returned results
    var results = filesExist(fileArray, { checkGlobs: true, throwOnMissing: false });
    chai.expect('images/*.png' in results).to.not.equal(false);
  });
});
```

## Usage in build process
Use `files-exist` around your `gulp.src()` source files to notice when a soft dependency is broken. This can help you to spot newly added [bower](http://bower.io/) components that haven't been installed on your local machine yet.

```javascript
var jsLibs = [
    sourcePath + '/vendor/jquery/dist/jquery.js',
    sourcePath + '/vendor/jquery.stellar/jquery.stellar.min.js',
    sourcePath + '/vendor/autofill-event/src/autofill-event.js',
    sourcePath + '/vendor/js-cookie/src/js.cookie.js',
    sourcePath + '/vendor/modernizr/modernizr.js',
    sourcePath + '/vendor/lodash/lodash.js'
];

gulp.task('build:js', function() {
  return gulp.src(filesExist(jsLibs, { errorMessage: 'Please run `bower install` to install missing library' }))
  .pipe(gulp.dest(outputPath + '/js'));
});
```

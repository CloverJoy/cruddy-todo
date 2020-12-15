const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (callback) => {
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
  // readCounter((err, counter) => {
  //   writeCounter(counter + 1, (err, uniqueId) => {
  //     callback(err, uniqueId);
  //   });
  // });
  readCounter(function (err, counter) {
    if (err) {
      throw (err);
    } else {
      writeCounter(counter + 1, function (err, uniqueId) {
        if (err) {
          throw (err);
        } else {
          callback(err, uniqueId);
        }
      });
    }
  });
};

// readCounter first, to extract the file data from latest entry??
// after we read and have file data, we want to create the next unique id...
// ...and then writeCounter


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');


// to get next unique id, we need the last id plus 1
// we need the counter variable to be saved to the hard drive
// do we need to create a new file? a new dir?
// how can we re-write getNextUniqueId to utilize the helper functions?
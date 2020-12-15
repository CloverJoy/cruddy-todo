const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
  counter.getNextUniqueId((err, id) => {
    var filePath = path.join(exports.dataDir, id + '.txt');
    fs.writeFile(filePath, text, (err) => {
      if (err) {
        callback(err);
      } else {
        callback(null, {id, text} );
      }
    });
  });
};

exports.readAll = (callback) => {
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
  var filePath = exports.dataDir;
  fs.readdir(filePath, (err, files) => {
    if (err) {
      throw (err);
    } else {
      // callback(null, files);
      var copyFiles = files.map((value) => {
        var id = value.replace('.txt', '');
        var objectResult = {};
        objectResult.id = id;
        var eachText = fs.readFileSync(path.join(filePath, value));
        //this is illegal because I use readFileSync lol
        objectResult.text = eachText.toString();
        console.log(objectResult);
        return objectResult;
      });
      callback(null, copyFiles);
    }
  });

  // refactor existing test...
  // ... to expect text of to-do instead of id
  // many async functions needed?
};

exports.readOne = (id, callback) => {
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
  var filePath = path.join(exports.dataDir, id + '.txt');
  fs.readFile(filePath, (err, text) => {
    if (err) {
      callback(err);
    } else {
      var text = text.toString();
      callback(null, ({id, text}) );
    }
  });

};

exports.update = (id, text, callback) => {
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
  //readfile, if file exist try to update
  // to update- writeFile, use the same id but change the text
  var filePath = path.join(exports.dataDir, id + '.txt');
  fs.readFile(filePath, (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(filePath, text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, { id, text});
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
  // start by making the filePath variable
  // use unlink method
  var filePath = path.join(exports.dataDir, id + '.txt');
  fs.unlink(filePath, (err) => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};

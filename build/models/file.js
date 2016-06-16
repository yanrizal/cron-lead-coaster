'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var fileSchema = new _mongoose2['default'].Schema({
  fileId: { type: String },
  name: { type: String },
  status: { type: Number },
  userId: { type: String }
});

var File = _mongoose2['default'].model('File', fileSchema, 'file');

var findUserFile = function findUserFile(params, cb) {
  File.find(params, function (err, file) {
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};

exports.findUserFile = findUserFile;
var deleteFile = function deleteFile(params, cb) {
  File.find(params).remove(function (err, response) {
    console.log(response);
    var result = {
      successfully_deleted: false
    };
    if (err) return cb(null, result);
    result.successfully_deleted = true;
    cb(null, result);
    return true;
  });
};

exports.deleteFile = deleteFile;
var updateFile = function updateFile(params, cb) {
  File.findOne({ fileId: params.fileId }, function (error, file) {
    file.status = params.status;
    file.save(function (err, response) {
      console.log(response);
      var result = {
        successfully_updated: false
      };
      if (err) return cb(null, result);
      result.successfully_updated = true;
      cb(null, result);
      return true;
    });
  });
};

exports.updateFile = updateFile;
var saveFile = function saveFile(params, cb) {
  var result = {};
  File.findOne({ fileId: params.fileId }, function (error, file) {
    if (file === null) {
      var newFile = new File(params);
      newFile.save(function (err, response) {
        console.log(response);
        result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    } else {
      result = {
        file_already_exist: true
      };
      cb(null, result);
      return true;
    }
  });
};
exports.saveFile = saveFile;
//# sourceMappingURL=file.js.map
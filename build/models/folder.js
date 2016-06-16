'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _md5 = require('md5');

var _md52 = _interopRequireDefault(_md5);

var folderSchema = new _mongoose2['default'].Schema({
  userId: { type: String },
  folderName: { type: String },
  file: [{
    name: { type: String },
    dom: { type: String },
    fileId: { type: String },
    fileIcon: { type: String }
  }],
  moduleType: { type: String }
});

var Folder = _mongoose2['default'].model('Folder', folderSchema, 'folder');

var findFolder = function findFolder(params, cb) {
  Folder.find(params, function (err, folder) {
    if (err) return cb(err);
    cb(null, folder);
    return true;
  });
};

exports.findFolder = findFolder;
var deleteFolder = function deleteFolder(params, cb) {
  Folder.find(params).remove(function (err, response) {
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

exports.deleteFolder = deleteFolder;
var findOne = function findOne(params, cb) {
  var md5File = [];
  var fileArray = params.file;
  if (fileArray.length >= 1) {
    fileArray.map(function (data) {
      var newFile = {
        name: (0, _md52['default'])(data.fileName),
        dom: data.fileNode,
        fileId: data.fileId,
        fileIcon: data.fileIcon
      };
      md5File.push(newFile);
      return true;
    });
  }
  Folder.findOne({ userId: params.userId, folderName: params.folderName }, function (error, folder) {
    if (folder === null) {
      params.file = md5File;
      var newFolder = new Folder(params);
      newFolder.save(function (err, response) {
        console.log(response);
        var result = {
          successfully_created: false
        };
        if (err) return cb(null, result);
        result.successfully_created = true;
        cb(null, result);
        return true;
      });
    } else {
      folder.file = md5File;
      folder.save(function (err, response) {
        console.log(response);
        var result = {
          successfully_updated: false
        };
        if (err) return cb(null, result);
        result.successfully_updated = true;
        cb(null, result);
        return true;
      });
    }
  });
};
exports.findOne = findOne;
//# sourceMappingURL=folder.js.map
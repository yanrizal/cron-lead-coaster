'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var fileSchema = new _mongoose2['default'].Schema({
  data: [{
    dataIndex: { type: Number, max: 2000 },
    urlSearch: { type: String },
    totalSearch: { type: String },
    leadCount: { type: Number, max: 2000 },
    profileVisit: { type: Array },
    searchName: { type: String },
    lastPage: { type: Number }
  }],
  meta: {
    username: { type: String },
    linkedin: {
      email: { type: String },
      password: { type: String }
    }
  }
});

var File = _mongoose2['default'].model('File', fileSchema, 'file');

var findFile = function findFile(params, cb) {
  console.log(params.username);
  File.findOne({ 'meta.username': params.username }, function (err, file) {
    console.log(file);
    if (err) return cb(err);
    cb(null, file);
    return true;
  });
};
exports.findFile = findFile;
//# sourceMappingURL=file.js.map
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _modelsFile = require('../models/file');

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _nodeSchedule = require('node-schedule');

var _nodeSchedule2 = _interopRequireDefault(_nodeSchedule);

require('shelljs/global');

var jsonParser = _bodyParser2['default'].json();

// app/routes.js
module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('index', { title: 'index' });
  });

  app.post('/startapi', jsonParser, function (req, res) {
    var params = {
      searchId: req.body.searchId,
      username: req.body.username
    };
    exec('./vendor/casperjs/bin/casperjs sample.js --searchId=' + params.searchId + ' --username=' + params.username, function (status, output) {
      console.log('Exit status:', status);
      console.log('Program output:', output);
    });
    res.json({});
  });

  app.post('/startapitest', jsonParser, function (req, res) {
    console.log('exec');
    var params = {
      searchId: req.body.searchId,
      username: req.body.username
    };
    console.log('searchId: ', params.searchId);
    console.log('username: ', params.username);
    (0, _modelsFile.findFile)(params, function (err, response) {
      //console.log(response);
      var email = response.meta.linkedin.email;
      var passwordEnc = response.meta.linkedin.password;
      var algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
      var key = process.env.TOKEN_SECRET;
      var decipher = _crypto2['default'].createDecipher(algorithm, key);
      var decrypted = decipher.update(passwordEnc, 'hex', 'utf8') + decipher.final('utf8');
      //console.log(decrypted);
      res.json(response);
      exec('casperjs sample.js --searchId=' + params.searchId + ' --username=' + params.username + ' --email=' + email + ' --password=' + decrypted, function (status, output) {
        //console.log('Exit status:', status);
        //console.log('Program output:', output);
      });
    });
  });
};
//# sourceMappingURL=main.routes.js.map
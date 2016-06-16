'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _simplecrawler = require('simplecrawler');

var _simplecrawler2 = _interopRequireDefault(_simplecrawler);

var _querystring = require('querystring');

var _querystring2 = _interopRequireDefault(_querystring);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

require('shelljs/global');
// const router = express.Router();
var jsonParser = _bodyParser2['default'].json();

// app/routes.js
module.exports = function (app, passport) {

  app.get('/', function (req, res) {
    res.render('index', { title: 'index' });
  });

  app.post('/startapi', jsonParser, function (req, res) {
    // const params = {
    //   url: req.body.url
    // };
    exec('./vendor/casperjs/bin/casperjs sample.js', function (status, output) {
      console.log('Exit status:', status);
      console.log('Program output:', output);
    });
    res.json({});
  });

  app.post('/startapitest', jsonParser, function (req, res) {
    exec('casperjs sample.js', function (status, output) {
      console.log('Exit status:', status);
      console.log('Program output:', output);
    });
    res.json({});
  });
};
//# sourceMappingURL=main.routes.js.map
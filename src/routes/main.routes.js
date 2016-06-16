import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import cheerio from 'cheerio';
import Crawler from 'simplecrawler';
import querystring from 'querystring';
import fs from 'fs';
import chalk from 'chalk';
import passport from 'passport';
require('shelljs/global');
// const router = express.Router();
const jsonParser = bodyParser.json();

// app/routes.js
module.exports = function(app, passport) {

    app.get('/', function(req, res) {
      res.render('index', { title: 'index'});
    });

    app.post('/startapi', jsonParser, (req, res) => {
      // const params = {
      //   url: req.body.url
      // };
      exec('./vendor/casperjs/bin/casperjs sample.js', function(status, output) {
        console.log('Exit status:', status);
        console.log('Program output:', output);
      });
      res.json({});
    });

    app.post('/startapitest', jsonParser, (req, res) => {
      exec('casperjs sample.js', function(status, output) {
        console.log('Exit status:', status);
        console.log('Program output:', output);
      });
      res.json({});
    });

    
};





import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import fs from 'fs';
import chalk from 'chalk';
import passport from 'passport';
require('shelljs/global');
// const router = express.Router();
const jsonParser = bodyParser.json();

// app/routes.js
module.exports = (app, passport) => {

    app.get('/', (req, res) => {
      res.render('index', { title: 'index'});
    });

    app.post('/startapi', jsonParser, (req, res) => {
      const params = {
        searchId: req.body.searchId,
        username: req.body.username
      };
      exec(`./vendor/casperjs/bin/casperjs sample.js --searchId=${params.searchId} --username=${params.username}`, function(status, output) {
        console.log('Exit status:', status);
        console.log('Program output:', output);
      });
      res.json({});
    });

    app.post('/startapitest', jsonParser, (req, res) => {
      console.log('exec');
      const params = {
        searchId: req.body.searchId,
        username: req.body.username
      };
      console.log('searchId: ',params.searchId);
      console.log('username: ', params.username);
      exec(`casperjs sample.js --searchId=${params.searchId} --username=${params.username}`, function(status, output) {
        //console.log('Exit status:', status);
        //console.log('Program output:', output);
      });
      res.json({});
    });

    
};





import express from 'express';
import bodyParser from 'body-parser';
import request from 'request';
import fs from 'fs';
import chalk from 'chalk';
import passport from 'passport';
require('shelljs/global');
import { findFile } from '../models/file';
import crypto from 'crypto';
import assert from 'assert';
import schedule from 'node-schedule';

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
      findFile(params, (err, response) => {
        //console.log(response);
        const email = response.meta.linkedin.email;
        const passwordEnc = response.meta.linkedin.password;
        const algorithm = 'aes256'; // or any other algorithm supported by OpenSSL
        const key = process.env.TOKEN_SECRET;;
        const decipher = crypto.createDecipher(algorithm, key);
        const decrypted = decipher.update(passwordEnc, 'hex', 'utf8') + decipher.final('utf8');
        //console.log(decrypted);
        res.json(response);
        exec(`casperjs sample.js --searchId=${params.searchId} --username=${params.username} --email=${email} --password=${decrypted}`, function(status, output) {
          //console.log('Exit status:', status);
          //console.log('Program output:', output);
        });
      });
      
    });

    
};





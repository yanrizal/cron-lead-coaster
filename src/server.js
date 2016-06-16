import express from 'express';
import path from 'path';
import routes from './routes/main.routes';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import { dbUrl } from './config/database';

const app = express();
// database connection
// mongoose.connect(dbUrl.url);
// const db = mongoose.connection;
// db.on('error', (err) => {
//   console.log(err);
//   console.log('error connection');
// });
// db.once('open', () => {
//   console.log('connect!!');
// });

require('./config/passport')(passport); // pass passport for configuration

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/main.routes.js')(app, passport); // load our routes and pass in our app and fully configured passport


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

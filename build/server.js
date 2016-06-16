'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routesMainRoutes = require('./routes/main.routes');

var _routesMainRoutes2 = _interopRequireDefault(_routesMainRoutes);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _configDatabase = require('./config/database');

var app = (0, _express2['default'])();
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

require('./config/passport')(_passport2['default']); // pass passport for configuration

app.use((0, _morgan2['default'])('dev'));
app.use((0, _cookieParser2['default'])());
app.use((0, _bodyParser2['default'])());
// required for passport
app.use((0, _expressSession2['default'])({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(_passport2['default'].initialize());
app.use(_passport2['default'].session()); // persistent login sessions
app.use((0, _connectFlash2['default'])()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/main.routes.js')(app, _passport2['default']); // load our routes and pass in our app and fully configured passport

app.set('views', _path2['default'].join(__dirname, 'views'));
app.set('view engine', 'hjs');
// app.use('/', routes);
app.use(_express2['default']['static'](_path2['default'].join(__dirname, 'public')));
app.set('port', process.env.PORT || 8000);

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});
//# sourceMappingURL=server.js.map
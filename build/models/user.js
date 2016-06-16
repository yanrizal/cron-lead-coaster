'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

// define the schema for our user model
var userSchema = _mongoose2['default'].Schema({
    local: {
        email: String,
        password: String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return _bcryptNodejs2['default'].hashSync(password, _bcryptNodejs2['default'].genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return _bcryptNodejs2['default'].compareSync(password, this.local.password);
};

var User = _mongoose2['default'].model('User', userSchema);
exports.User = User;
//# sourceMappingURL=user.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.floatyGenerateIdentifier = exports.floatyNavigator = exports.floatyReducer = exports.Floaty = undefined;

var _identifiers = require('./identifiers');

Object.defineProperty(exports, 'floatyGenerateIdentifier', {
  enumerable: true,
  get: function get() {
    return _identifiers.generateIdentifier;
  }
});

var _Floaty2 = require('./Floaty');

var _Floaty3 = _interopRequireDefault(_Floaty2);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _navigator = require('./navigator');

var _navigator2 = _interopRequireDefault(_navigator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Floaty = _Floaty3.default;
exports.floatyReducer = _reducers2.default;
exports.floatyNavigator = _navigator2.default;
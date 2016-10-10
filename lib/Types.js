'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.floatyContextType = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var floatyContextType = exports.floatyContextType = _react2.default.PropTypes.shape({
    float: _react2.default.PropTypes.func.isRequired,
    theme: _react2.default.PropTypes.object.isRequired,
    refs: _react2.default.PropTypes.object.isRequired
}).isRequired;
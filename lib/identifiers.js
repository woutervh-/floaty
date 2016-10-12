'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generateIdentifier = generateIdentifier;
exports.isIdentifier = isIdentifier;

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _isUuid = require('is-uuid');

var _isUuid2 = _interopRequireDefault(_isUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function generateIdentifier() {
    return _uuid2.default.v4();
}

function isIdentifier(identifier) {
    return typeof identifier === 'number' || _isUuid2.default.v4(identifier);
}
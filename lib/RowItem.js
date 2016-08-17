'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _GenericContent2 = require('./GenericContent');

var _GenericContent3 = _interopRequireDefault(_GenericContent2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RowItem = function (_GenericContent) {
    _inherits(RowItem, _GenericContent);

    function RowItem() {
        _classCallCheck(this, RowItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RowItem).apply(this, arguments));
    }

    _createClass(RowItem, [{
        key: 'render',
        value: function render() {
            var theme = this.context.theme;
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;

            var other = _objectWithoutProperties(_props, ['children', 'className']);

            return _react2.default.createElement(
                'div',
                _extends({ ref: 'container', className: (0, _classnames2.default)(theme['floaty-row-item'], className) }, other),
                this.transformChildren()
            );
        }
    }]);

    return RowItem;
}(_GenericContent3.default);

RowItem.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = RowItem;
;
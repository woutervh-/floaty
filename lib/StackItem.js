'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SplittablePanel2 = require('./SplittablePanel');

var _SplittablePanel3 = _interopRequireDefault(_SplittablePanel2);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackItem = function (_SplittablePanel) {
    _inherits(StackItem, _SplittablePanel);

    function StackItem() {
        _classCallCheck(this, StackItem);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StackItem).apply(this, arguments));
    }

    _createClass(StackItem, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContent) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContent);
        }
    }, {
        key: 'dispatch',
        value: function dispatch(action) {
            this.props.dispatch((0, _actions.updateGeneric)(action));
        }
    }, {
        key: 'render',
        value: function render() {
            var theme = this.context.theme;
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;
            var dispatch = _props.dispatch;

            var other = _objectWithoutProperties(_props, ['children', 'className', 'dispatch']);

            return _react2.default.createElement(
                'div',
                _extends({ ref: 'container', className: (0, _classnames2.default)(theme['floaty-stack-item'], className) }, other),
                this.transformChildren()
            );
        }
    }]);

    return StackItem;
}(_SplittablePanel3.default);

StackItem.propTypes = {
    dispatch: _react2.default.PropTypes.func.isRequired
};
StackItem.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = StackItem;
;
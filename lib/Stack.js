'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stack = function (_React$Component) {
    _inherits(Stack, _React$Component);

    function Stack() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Stack);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Stack)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            active: 0
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Stack, [{
        key: 'handleTabClick',
        value: function handleTabClick(index) {
            this.setState({ active: index });
        }
    }, {
        key: 'renderActiveChild',
        value: function renderActiveChild() {
            var children = this.props.children;

            return _react2.default.Children.toArray(children)[this.state.active];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var theme = this.context.theme;
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;

            var other = _objectWithoutProperties(_props, ['children', 'className']);

            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-stack'], className) }, other),
                _react2.default.createElement(
                    'div',
                    { className: theme['floaty-stack-header'] },
                    _react2.default.createElement(
                        'ul',
                        { className: theme['floaty-stack-header-tabs'] },
                        _react2.default.Children.map(this.props.children, function (child, index) {
                            return _react2.default.createElement(
                                'li',
                                { className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], _defineProperty({}, theme['floaty-stack-header-tabs-item-active'], index == _this2.state.active)), onClick: _this2.handleTabClick.bind(_this2, index) },
                                child.props.title
                            );
                        })
                    )
                ),
                this.renderActiveChild()
            );
        }
    }]);

    return Stack;
}(_react2.default.Component);

Stack.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Stack;
;
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

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _Types = require('./Types');

var _StackItem = require('./StackItem');

var _StackItem2 = _interopRequireDefault(_StackItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StackFloating = function (_React$Component) {
    _inherits(StackFloating, _React$Component);

    function StackFloating() {
        _classCallCheck(this, StackFloating);

        return _possibleConstructorReturn(this, (StackFloating.__proto__ || Object.getPrototypeOf(StackFloating)).apply(this, arguments));
    }

    _createClass(StackFloating, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContent) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContent);
        }
    }, {
        key: 'renderHeaderTab',
        value: function renderHeaderTab() {
            var title = this.props.title;
            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'li',
                { className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active']) },
                title
            );
        }
    }, {
        key: 'renderHeaderTabs',
        value: function renderHeaderTabs() {
            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'ul',
                { className: theme['floaty-stack-header-tabs'] },
                this.renderHeaderTab()
            );
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                { ref: 'header', className: theme['floaty-stack-header'] },
                this.renderHeaderTabs()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var title = _props.title;
            var item = _props.item;
            var style = _props.style;
            var x = _props.x;
            var y = _props.y;

            var other = _objectWithoutProperties(_props, ['className', 'title', 'item', 'style', 'x', 'y']);

            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-stack'], theme['floaty-stack-floating'], className), style: _extends({}, style, { top: y, left: x }) }, other),
                this.renderHeader(),
                _react2.default.createElement(_StackItem2.default, { value: item })
            );
        }
    }]);

    return StackFloating;
}(_react2.default.Component);

StackFloating.propTypes = {
    title: _react2.default.PropTypes.any.isRequired,
    item: _react2.default.PropTypes.any.isRequired,
    x: _react2.default.PropTypes.number.isRequired,
    y: _react2.default.PropTypes.number.isRequired
};
StackFloating.contextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = StackFloating;
;
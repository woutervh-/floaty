'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noOp = function noOp() {
    return undefined;
};

var Stack = function (_React$Component) {
    _inherits(Stack, _React$Component);

    function Stack() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Stack);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Stack)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.draggables = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Stack, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.makeDraggables();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.unmakeDraggables(this.makeDraggables.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unmakeDraggables();
        }
    }, {
        key: 'makeDraggables',
        value: function makeDraggables() {
            for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
                var draggable = (0, _Draggable2.default)(_reactDom2.default.findDOMNode(this.refs['tab-' + i]), 5);
                draggable.on('dragstart', this.handleDragStart.bind(this, i));
                this.draggables.push(draggable);
            }
        }
    }, {
        key: 'unmakeDraggables',
        value: function unmakeDraggables() {
            var _this2 = this;

            var callback = arguments.length <= 0 || arguments[0] === undefined ? noOp : arguments[0];

            if (this.draggables.length == 0) {
                setImmediate(callback);
            } else {
                (function () {
                    var destroyedCount = 0;
                    _this2.draggables.forEach(function (draggable) {
                        return draggable.on('destroyed', function () {
                            if (++destroyedCount == _this2.draggables.length) {
                                _this2.draggables = [];
                                setImmediate(callback);
                            }
                        });
                    });
                    _this2.draggables.forEach(function (draggable) {
                        return draggable.emit('destroy');
                    });
                })();
            }
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(index, event) {
            // Remove draggable from this, and give control of it to 'above'
            var draggable = this.draggables.splice(index, 1)[0];
            this.props.float(index, event, draggable);

            // Remove item from the stack
            this.props.dispatch((0, _actions.removeTab)(index));
        }
    }, {
        key: 'handleTabClick',
        value: function handleTabClick(index) {
            this.props.dispatch((0, _actions.updateActiveTab)(index));
        }
    }, {
        key: 'renderActiveChild',
        value: function renderActiveChild() {
            var _props = this.props;
            var active = _props.active;
            var children = _props.children;

            return _react2.default.Children.toArray(children)[active];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props;
            var active = _props2.active;
            var children = _props2.children;
            var className = _props2.className;
            var dispatch = _props2.dispatch;
            var float = _props2.float;
            var names = _props2.names;

            var other = _objectWithoutProperties(_props2, ['active', 'children', 'className', 'dispatch', 'float', 'names']);

            var theme = this.context.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-stack'], className) }, other),
                _react2.default.createElement(
                    'div',
                    { ref: 'header', className: theme['floaty-stack-header'] },
                    _react2.default.createElement(
                        'ul',
                        { className: theme['floaty-stack-header-tabs'] },
                        _react2.default.Children.map(this.props.children, function (child, index) {
                            return _react2.default.createElement(
                                'li',
                                { ref: 'tab-' + index, className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], _defineProperty({}, theme['floaty-stack-header-tabs-item-active'], index == active)), onClick: _this3.handleTabClick.bind(_this3, index) },
                                names[index]
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

Stack.propTypes = {
    active: _react2.default.PropTypes.number.isRequired,
    dispatch: _react2.default.PropTypes.func.isRequired,
    float: _react2.default.PropTypes.func.isRequired,
    names: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string).isRequired
};
Stack.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Stack;
;
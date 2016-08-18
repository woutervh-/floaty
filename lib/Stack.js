'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

var _SplittablePanel2 = require('./SplittablePanel');

var _SplittablePanel3 = _interopRequireDefault(_SplittablePanel2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noOp = function noOp() {
    return undefined;
};

var Stack = function (_SplittablePanel) {
    _inherits(Stack, _SplittablePanel);

    function Stack() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Stack);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Stack)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.unmakeDraggablesImmediate = null, _this.draggables = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Stack, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContent) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContent);
        }
    }, {
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
            clearImmediate(this.unmakeDraggablesImmediate);
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

            if (!!this.unmakeDraggablesImmediate) {
                clearImmediate(this.unmakeDraggablesImmediate);
            }

            if (this.draggables.length == 0) {
                this.unmakeDraggablesImmediate = setImmediate(callback);
            } else {
                (function () {
                    var destroyedCount = 0;
                    _this2.draggables.forEach(function (draggable) {
                        return draggable.on('destroyed', function () {
                            if (++destroyedCount == _this2.draggables.length) {
                                _this2.draggables = [];
                                _this2.unmakeDraggablesImmediate = setImmediate(callback);
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
            this.props.float(index, event, this.props.dispatch, draggable);
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

            return _react2.default.cloneElement(_react2.default.Children.toArray(children)[active], { ref: 'stack-item-' + active });
        }
    }, {
        key: 'dispatch',
        value: function dispatch(action) {
            this.props.dispatch(action);
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var _this3 = this;

            var headerElement = _reactDom2.default.findDOMNode(this.refs['header']);
            var headerBox = _DomUtil2.default.elementOffset(headerElement);
            if (_DomUtil2.default.isWithinBox(position, headerBox)) {
                var _ret3 = function () {
                    var _dispatch = _this3.props.dispatch;

                    return {
                        v: _extends({}, headerBox, { dispatch: function dispatch(item, name) {
                                return _dispatch((0, _actions.insertTab)(_react2.default.Children.count(_this3.props.children), item, name));
                            }, resolved: true })
                    };
                }();

                if ((typeof _ret3 === 'undefined' ? 'undefined' : _typeof(_ret3)) === "object") return _ret3.v;
            } else {
                var containerElement = _reactDom2.default.findDOMNode(this.refs['container']);
                var containerBox = _DomUtil2.default.elementOffset(containerElement);
                if (_DomUtil2.default.isWithinBox(position, containerBox)) {
                    return this.split(position);
                } else {
                    return { x: 0, y: 0, width: 0, height: 0, dispatch: _actions.noOperation, resolved: false };
                }
                // const {active} = this.props;
                // const childElement = ReactDOM.findDOMNode(this.refs['stack-item-' + active]);
                // const childBox = DomUtil.elementOffset(childElement);
                // if (DomUtil.isWithinBox(position, childBox)) {
                //     return this.refs['stack-item-' + active].resolveDropArea(position);
                // } else {
                //     return {x: 0, y: 0, width: 0, height: 0, dispatch: noOperation, resolved: false};
                // }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

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
                _extends({ ref: 'container', className: (0, _classnames2.default)(theme['floaty-stack'], className) }, other),
                _react2.default.createElement(
                    'div',
                    { ref: 'header', className: theme['floaty-stack-header'] },
                    _react2.default.createElement(
                        'ul',
                        { className: theme['floaty-stack-header-tabs'] },
                        _react2.default.Children.map(this.props.children, function (child, index) {
                            return _react2.default.createElement(
                                'li',
                                { ref: 'tab-' + index, className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], _defineProperty({}, theme['floaty-stack-header-tabs-item-active'], index == active)), onClick: _this4.handleTabClick.bind(_this4, index) },
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
}(_SplittablePanel3.default);

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
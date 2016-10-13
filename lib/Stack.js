'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

var DomUtil = _interopRequireWildcard(_DomUtil);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

var _StackItem = require('./StackItem');

var _StackItem2 = _interopRequireDefault(_StackItem);

var _Types = require('./Types');

var _split = require('./split');

var _split2 = _interopRequireDefault(_split);

var _identifiers = require('./identifiers');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stack = function (_React$Component) {
    _inherits(Stack, _React$Component);

    function Stack() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Stack);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Stack.__proto__ || Object.getPrototypeOf(Stack)).call.apply(_ref, [this].concat(args))), _this), _this.unmakeDraggablesTimeout = null, _this.draggables = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Stack, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContext);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.makeDraggables();
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate() {
            this.unmakeDraggables();
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
            var _this2 = this;

            var items = this.props.items;

            var _loop = function _loop(i) {
                var draggable = (0, _Draggable2.default)(_reactDom2.default.findDOMNode(_this2['tab-' + i]), 5);
                draggable.on('dragstart', function () {
                    return _this2.handleDragStart(i);
                });
                _this2.draggables.push(draggable);
            };

            for (var i = 0; i < items.length; i++) {
                _loop(i);
            }
        }
    }, {
        key: 'unmakeDraggables',
        value: function unmakeDraggables() {
            var _this3 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
                return undefined;
            };

            if (this.unmakeDraggablesTimeout) {
                window.clearTimeout(this.unmakeDraggablesTimeout);
            }

            if (this.draggables.length === 0) {
                this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
            } else {
                (function () {
                    var destroyedCount = 0;
                    _this3.draggables.forEach(function (draggable) {
                        return draggable.on('destroyed', function () {
                            if (++destroyedCount == _this3.draggables.length) {
                                _this3.draggables = [];
                                _this3.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
                            }
                        });
                    });
                    _this3.draggables.forEach(function (draggable) {
                        return draggable.emit('destroy');
                    });
                })();
            }
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart(index) {
            var _props = this.props;
            var id = _props.id;
            var dispatch = _props.dispatch;
            var items = _props.items;
            var titles = _props.titles;
            var float = this.context.floatyContext.float;

            this.draggables.splice(index, 1)[0].emit('destroy');
            float(items[index], titles[index]);
            dispatch((0, _actions.removeTab)(id, index));
        }
    }, {
        key: 'handleTabClick',
        value: function handleTabClick(index) {
            var _props2 = this.props;
            var id = _props2.id;
            var dispatch = _props2.dispatch;

            dispatch((0, _actions.setActiveTab)(id, index));
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var _this4 = this;

            var headerElement = _reactDom2.default.findDOMNode(this.header);
            var headerBox = DomUtil.elementOffset(headerElement);
            if (DomUtil.isWithinBox(position, headerBox)) {
                var _ret4 = function () {
                    var _props3 = _this4.props;
                    var dispatch = _props3.dispatch;
                    var id = _props3.id;
                    var items = _props3.items;

                    var _loop2 = function _loop2(i) {
                        var tabElement = _reactDom2.default.findDOMNode(_this4['tab-' + i]);
                        var tabBox = DomUtil.elementOffset(tabElement);
                        if (DomUtil.isWithinBox(position, tabBox)) {
                            return {
                                v: {
                                    v: _extends({}, tabBox, { execute: function execute(item, title) {
                                            return dispatch((0, _actions.insertTab)(id, i, item, title));
                                        }, resolved: true })
                                }
                            };
                        }
                    };

                    for (var i = 0; i < items.length; i++) {
                        var _ret5 = _loop2(i);

                        if ((typeof _ret5 === 'undefined' ? 'undefined' : _typeof(_ret5)) === "object") return _ret5.v;
                    }
                    return {
                        v: _extends({}, headerBox, { execute: function execute(item, title) {
                                return dispatch((0, _actions.insertTab)(id, items.length, item, title));
                            }, resolved: true })
                    };
                }();

                if ((typeof _ret4 === 'undefined' ? 'undefined' : _typeof(_ret4)) === "object") return _ret4.v;
            } else {
                var containerElement = _reactDom2.default.findDOMNode(this.container);
                var containerBox = DomUtil.elementOffset(containerElement);
                if (DomUtil.isWithinBox(position, containerBox)) {
                    var _props4 = this.props;
                    var _dispatch = _props4.dispatch;
                    var _id = _props4.id;

                    return (0, _split2.default)(containerElement, position, _id, _dispatch);
                } else {
                    return { x: 0, y: 0, width: 0, height: 0, resolved: false };
                }
            }
        }
    }, {
        key: 'renderTabs',
        value: function renderTabs() {
            var _this5 = this;

            var _props5 = this.props;
            var id = _props5.id;
            var active = _props5.active;
            var titles = _props5.titles;
            var items = _props5.items;
            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'ul',
                { className: theme['floaty-stack-header-tabs'] },
                [].concat(_toConsumableArray(new Array(items.length).keys())).map(function (index) {
                    return _react2.default.createElement(
                        'li',
                        { key: index, ref: function ref(r) {
                                return _this5['tab-' + index] = r;
                            }, className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], _defineProperty({}, theme['floaty-stack-header-tabs-item-active'], index === active)), onClick: function onClick() {
                                return _this5.handleTabClick(index);
                            } },
                        (0, _identifiers.isIdentifier)(titles[index]) ? _react2.default.createElement(_Item2.default, { id: titles[index], floatyStackId: id, floatyStackIndex: index }) : titles[index]
                    );
                })
            );
        }
    }, {
        key: 'renderControls',
        value: function renderControls() {
            var _props6 = this.props;
            var controls = _props6.controls;
            var dispatch = _props6.dispatch;
            var theme = this.context.floatyContext.theme;


            if (controls) {
                return _react2.default.createElement(
                    'ul',
                    { className: theme['floaty-stack-header-controls'] },
                    controls.map(function (control, index) {
                        return _react2.default.createElement(
                            'li',
                            { key: index, className: theme['floaty-stack-header-controls-item'] },
                            control(dispatch)
                        );
                    })
                );
            }
        }
    }, {
        key: 'renderHeader',
        value: function renderHeader() {
            var _this6 = this;

            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                { ref: function ref(r) {
                        return _this6.header = r;
                    }, className: theme['floaty-stack-header'] },
                this.renderTabs()
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var _props7 = this.props;
            var active = _props7.active;
            var items = _props7.items;
            var className = _props7.className;
            var controls = _props7.controls;
            var dispatch = _props7.dispatch;
            var float = _props7.float;
            var titles = _props7.titles;

            var other = _objectWithoutProperties(_props7, ['active', 'items', 'className', 'controls', 'dispatch', 'float', 'titles']);

            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                _extends({ ref: function ref(r) {
                        return _this7.container = r;
                    }, className: (0, _classnames2.default)(theme['floaty-stack'], className) }, other),
                this.renderHeader(),
                0 <= active && active < items.length && _react2.default.createElement(_StackItem2.default, { value: items[active] })
            );
        }
    }]);

    return Stack;
}(_react2.default.Component);

Stack.propTypes = {
    active: _react2.default.PropTypes.number,
    titles: _react2.default.PropTypes.array.isRequired,
    items: _react2.default.PropTypes.array.isRequired
};
Stack.defaultProps = {
    active: 0
};
Stack.contextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = Stack;
;
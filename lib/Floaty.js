'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _connect = require('react-redux/lib/connect/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _actions = require('./actions');

var _selectors = require('./selectors');

var _Types = require('./Types');

var _getPosition2 = require('./getPosition');

var _getPosition3 = _interopRequireDefault(_getPosition2);

var _identifiers = require('./identifiers');

var _StackFloating = require('./StackFloating');

var _StackFloating2 = _interopRequireDefault(_StackFloating);

var _DomUtil = require('./DomUtil');

var DomUtil = _interopRequireWildcard(_DomUtil);

var _navigator2 = require('./navigator');

var _navigator3 = _interopRequireDefault(_navigator2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Floaty = function (_React$Component) {
    _inherits(Floaty, _React$Component);

    function Floaty() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Floaty);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Floaty.__proto__ || Object.getPrototypeOf(Floaty)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            x: 0,
            y: 0,
            targetIndicator: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            showTargetIndicator: false
        }, _this.handleMove = function (event) {
            var isFloating = _this.props.isFloating;

            if (isFloating) {
                var _getPosition = (0, _getPosition3.default)(event);

                var x = _getPosition.x;
                var y = _getPosition.y;

                var _this$resolveDropArea = _this.resolveDropArea({ x: x, y: y });

                var left = _this$resolveDropArea.x;
                var top = _this$resolveDropArea.y;
                var width = _this$resolveDropArea.width;
                var height = _this$resolveDropArea.height;
                var resolved = _this$resolveDropArea.resolved;

                if (resolved) {
                    _this.setState({ x: x, y: y, showTargetIndicator: true, targetIndicator: { top: top, left: left, width: width, height: height } });
                } else {
                    _this.setState({ x: x, y: y, showTargetIndicator: false });
                }
            }
        }, _this.handleUp = function () {
            var isFloating = _this.props.isFloating;

            if (isFloating) {
                var _this$props = _this.props;
                var dispatch = _this$props.dispatch;
                var id = _this$props.id;
                var theme = _this$props.theme;
                var _this$state = _this.state;
                var x = _this$state.x;
                var y = _this$state.y;


                document.body.classList.remove(theme['floaty-unselectable']);
                var resolution = _this.resolveDropArea({ x: x, y: y });
                if (resolution.resolved) {
                    var _this$props2 = _this.props;
                    var floatingItem = _this$props2.floatingItem;
                    var floatingTitle = _this$props2.floatingTitle;

                    resolution.execute(floatingItem, floatingTitle);
                }
                dispatch((0, _actions.stopFloating)(id));
            }
        }, _this.dragStart = function (item, title) {
            var _this$props3 = _this.props;
            var dispatch = _this$props3.dispatch;
            var id = _this$props3.id;
            var theme = _this$props3.theme;

            dispatch((0, _actions.startFloating)(id, item, title));
            document.body.classList.add(theme['floaty-unselectable']);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Floaty, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            document.addEventListener('mousemove', this.handleMove);
            document.addEventListener('mouseup', this.handleUp);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.removeEventListener('mousemove', this.handleMove);
            document.removeEventListener('mouseup', this.handleUp);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                floatyContext: {
                    float: this.dragStart,
                    refs: this.props.refs,
                    theme: this.props.theme
                }
            };
        }
    }, {
        key: 'navigator',
        value: function navigator() {
            var _props = this.props;
            var floaty = _props.floaty;
            var id = _props.id;

            return (0, _navigator3.default)(floaty, id);
        }
    }, {
        key: 'renderFloatingStack',
        value: function renderFloatingStack() {
            var _props2 = this.props;
            var item = _props2.floatingItem;
            var title = _props2.floatingTitle;
            var _state = this.state;
            var x = _state.x;
            var y = _state.y;
            var _window = window;
            var scrollX = _window.scrollX;
            var scrollY = _window.scrollY;

            return _react2.default.createElement(_StackFloating2.default, { title: title, item: item, x: x - scrollX, y: y - scrollY });
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var _this2 = this;

            if (this.item) {
                return this.item.getWrappedInstance().resolveDropArea(position);
            } else {
                var _ret2 = function () {
                    var _props3 = _this2.props;
                    var dispatch = _props3.dispatch;
                    var id = _props3.id;

                    var box = DomUtil.elementOffset(_this2.container);
                    return {
                        v: _extends({}, box, {
                            resolved: true,
                            execute: function execute(item, title) {
                                return dispatch((0, _actions.setLayout)(id, { type: 'stack', items: [item], titles: [title] }));
                            }
                        })
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
        }
    }, {
        key: 'renderDropArea',
        value: function renderDropArea() {
            var theme = this.props.theme;
            var showTargetIndicator = this.state.showTargetIndicator;

            if (showTargetIndicator) {
                var _state$targetIndicato = this.state.targetIndicator;
                var left = _state$targetIndicato.left;
                var top = _state$targetIndicato.top;
                var width = _state$targetIndicato.width;
                var height = _state$targetIndicato.height;
                var _window2 = window;
                var scrollX = _window2.scrollX;
                var scrollY = _window2.scrollY;

                return _react2.default.createElement('div', { className: theme['floaty-target-indicator'], style: { top: top - scrollY, left: left - scrollX, width: width, height: height } });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props4 = this.props;
            var children = _props4.children;
            var layout = _props4.layout;
            var dispatch = _props4.dispatch;
            var id = _props4.id;
            var item = _props4.item;
            var refs = _props4.refs;
            var floaty = _props4.floaty;
            var stackControls = _props4.stackControls;
            var theme = _props4.theme;
            var isFloating = _props4.isFloating;
            var floatingItem = _props4.floatingItem;
            var floatingTitle = _props4.floatingTitle;

            var other = _objectWithoutProperties(_props4, ['children', 'layout', 'dispatch', 'id', 'item', 'refs', 'floaty', 'stackControls', 'theme', 'isFloating', 'floatingItem', 'floatingTitle']);

            return _react2.default.createElement(
                'div',
                _extends({ ref: function ref(r) {
                        return _this3.container = r;
                    } }, other),
                (0, _identifiers.isIdentifier)(item) ? _react2.default.createElement(_Item2.default, { ref: function ref(r) {
                        return _this3.item = r;
                    }, id: item }) : item,
                isFloating && this.renderFloatingStack(),
                isFloating && this.renderDropArea()
            );
        }
    }]);

    return Floaty;
}(_react2.default.Component);

Floaty.propTypes = {
    refs: _react2.default.PropTypes.object,
    floaty: _react2.default.PropTypes.object.isRequired,
    id: _react2.default.PropTypes.any.isRequired,
    item: _react2.default.PropTypes.any,
    theme: _react2.default.PropTypes.object.isRequired,
    stackControls: _react2.default.PropTypes.any,
    isFloating: _react2.default.PropTypes.bool.isRequired
};
Floaty.defaultProps = {
    refs: {}
};
Floaty.childContextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = (0, _connect2.default)(_selectors.floatySelector)(Floaty);
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

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _ColumnItem = require('./ColumnItem');

var _ColumnItem2 = _interopRequireDefault(_ColumnItem);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _RowItem = require('./RowItem');

var _RowItem2 = _interopRequireDefault(_RowItem);

var _Stack = require('./Stack');

var _Stack2 = _interopRequireDefault(_Stack);

var _StackFloating = require('./StackFloating');

var _StackFloating2 = _interopRequireDefault(_StackFloating);

var _StackItem = require('./StackItem');

var _StackItem2 = _interopRequireDefault(_StackItem);

var _actions = require('./actions');

var _SplittablePanel2 = require('./SplittablePanel');

var _SplittablePanel3 = _interopRequireDefault(_SplittablePanel2);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noOp = function noOp() {
    return undefined;
};

var Floaty = function (_SplittablePanel) {
    _inherits(Floaty, _SplittablePanel);

    function Floaty() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Floaty);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Floaty)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            floating: null,
            floatingTitle: '',
            x: 0,
            y: 0,
            targetIndicator: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            showTargetIndicator: false
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Floaty, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.state, nextState);
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return { theme: this.props.theme };
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var _this2 = this;

            if ('root' in this.refs) {
                return this.refs['root'].resolveDropArea(position);
            } else {
                var _ret2 = function () {
                    var _dispatch = _this2.props.dispatch;

                    var element = _reactDom2.default.findDOMNode(_this2.refs['container']);
                    var box = _DomUtil2.default.elementOffset(element);
                    return {
                        v: _extends({}, box, { dispatch: function dispatch(item, title) {
                                return _dispatch((0, _actions.setLayout)({ type: 'stack', titles: [title], items: [item] }));
                            }, resolved: true })
                    };
                }();

                if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
            }
        }
    }, {
        key: 'dragStart',
        value: function dragStart(stackObject, index, event, dispatch, draggable) {
            var _this3 = this;

            // This will take control of a draggable
            var theme = this.props.theme;

            document.body.classList.add(theme['floaty-unselectable']);

            // Start floating the item
            this.setState({ floating: stackObject.items[index], floatingTitle: stackObject.titles[index], x: event.position.x, y: event.position.y });
            // Remove item from the stack
            dispatch((0, _actions.removeTab)(index));

            draggable.on('drag', function (event) {
                var resolution = _this3.resolveDropArea({ x: event.position.x, y: event.position.y });
                var x = resolution.x;
                var y = resolution.y;
                var width = resolution.width;
                var height = resolution.height;
                var resolved = resolution.resolved;

                if (resolved) {
                    _this3.setState({ x: event.position.x, y: event.position.y, targetIndicator: { x: x, y: y, width: width, height: height }, showTargetIndicator: true });
                } else {
                    _this3.setState({ x: event.position.x, y: event.position.y, showTargetIndicator: false });
                }
            });
            draggable.on('dragstop', function (event) {
                document.body.classList.remove(theme['floaty-unselectable']);
                var resolution = _this3.resolveDropArea({ x: event.position.x, y: event.position.y });
                if (resolution.resolved) {
                    resolution.dispatch(_this3.state.floating, _this3.state.floatingTitle);
                }
                _this3.setState({ floating: null, floatingTitle: '' });
                draggable.emit('destroy');
            });
        }
    }, {
        key: 'renderGeneric',
        value: function renderGeneric(dispatch, refAccumulator, genericObject) {
            switch (genericObject.type) {
                case 'column':
                    return this.renderColumn(function (update) {
                        return dispatch((0, _actions.updateColumn)(update));
                    }, refAccumulator, genericObject);
                case 'row':
                    return this.renderRow(function (update) {
                        return dispatch((0, _actions.updateRow)(update));
                    }, refAccumulator, genericObject);
                case 'stack':
                    return this.renderStack(function (update) {
                        return dispatch((0, _actions.updateStack)(update));
                    }, refAccumulator, genericObject);
                default:
                    return this.renderLeafComponent(genericObject);
            }
        }
    }, {
        key: 'renderLeafComponent',
        value: function renderLeafComponent(leafObject) {
            switch (leafObject.type) {
                case 'prop-ref':
                    return this.props.refs[leafObject.name];
                case 'child-ref':
                    return this.props.children[leafObject.index];
                case 'component':
                    return leafObject.content;
                default:
                    return leafObject;
            }
        }
    }, {
        key: 'renderColumn',
        value: function renderColumn(dispatch, refAccumulator, columnObject) {
            var _this4 = this;

            var props = _extends({
                dispatch: dispatch,
                growValues: columnObject.growValues || Array(columnObject.items.length).fill(1)
            }, columnObject.props);
            return _react2.default.createElement(
                _Column2.default,
                _extends({ ref: refAccumulator.join('-') }, props),
                columnObject.items.map(function (columnItemObject, index) {
                    return _this4.renderColumnItem(function (update) {
                        return dispatch((0, _actions.updateColumnItem)(index, update));
                    }, [].concat(_toConsumableArray(refAccumulator), ['column-item-' + index]), columnItemObject, index);
                })
            );
        }
    }, {
        key: 'renderColumnItem',
        value: function renderColumnItem(dispatch, refAccumulator, columnItemObject, index) {
            return _react2.default.createElement(
                _ColumnItem2.default,
                { dispatch: dispatch, key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, refAccumulator, columnItemObject)
            );
        }
    }, {
        key: 'renderRow',
        value: function renderRow(dispatch, refAccumulator, rowObject) {
            var _this5 = this;

            var props = _extends({
                dispatch: dispatch,
                growValues: rowObject.growValues || Array(rowObject.items.length).fill(1)
            }, rowObject.props);
            return _react2.default.createElement(
                _Row2.default,
                _extends({ ref: refAccumulator.join('-') }, props),
                rowObject.items.map(function (rowItemObject, index) {
                    return _this5.renderRowItem(function (update) {
                        return dispatch((0, _actions.updateRowItem)(index, update));
                    }, [].concat(_toConsumableArray(refAccumulator), ['row-item-' + index]), rowItemObject, index);
                })
            );
        }
    }, {
        key: 'renderRowItem',
        value: function renderRowItem(dispatch, refAccumulator, rowItemObject, index) {
            return _react2.default.createElement(
                _RowItem2.default,
                { dispatch: dispatch, key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, refAccumulator, rowItemObject)
            );
        }
    }, {
        key: 'renderStack',
        value: function renderStack(dispatch, refAccumulator, stackObject) {
            var _this6 = this;

            var props = _extends({
                dispatch: dispatch,
                controls: this.props.stackControls,
                active: stackObject.active || 0,
                titles: stackObject.titles.map(function (tabTitle) {
                    return _this6.renderLeafComponent(tabTitle);
                }) || [],
                float: this.dragStart.bind(this, stackObject)
            }, stackObject.props);
            return _react2.default.createElement(
                _Stack2.default,
                _extends({ ref: refAccumulator.join('-') }, props),
                stackObject.items.map(function (stackItemObject, index) {
                    return _this6.renderStackItem(function (update) {
                        return dispatch((0, _actions.updateStackItem)(index, update));
                    }, [].concat(_toConsumableArray(refAccumulator), ['stack-item-' + index]), stackItemObject, index);
                })
            );
        }
    }, {
        key: 'renderStackItem',
        value: function renderStackItem(dispatch, refAccumulator, stackItemObject, index) {
            return _react2.default.createElement(
                _StackItem2.default,
                { dispatch: dispatch, key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, refAccumulator, stackItemObject)
            );
        }
    }, {
        key: 'renderFloatingStack',
        value: function renderFloatingStack() {
            var _state = this.state;
            var stackItemObject = _state.floating;
            var title = _state.floatingTitle;
            var x = _state.x;
            var y = _state.y;
            var _window = window;
            var scrollX = _window.scrollX;
            var scrollY = _window.scrollY;

            return _react2.default.createElement(
                _StackFloating2.default,
                { title: this.renderLeafComponent(title), x: x - scrollX, y: y - scrollY },
                _react2.default.createElement(
                    _StackItem2.default,
                    { dispatch: noOp },
                    this.renderGeneric(noOp, ['floating'], stackItemObject)
                )
            );
        }
    }, {
        key: 'renderDropArea',
        value: function renderDropArea() {
            var theme = this.props.theme;
            var showTargetIndicator = this.state.showTargetIndicator;

            if (showTargetIndicator) {
                var _state$targetIndicato = this.state.targetIndicator;
                var x = _state$targetIndicato.x;
                var y = _state$targetIndicato.y;
                var width = _state$targetIndicato.width;
                var height = _state$targetIndicato.height;
                var _window2 = window;
                var scrollX = _window2.scrollX;
                var scrollY = _window2.scrollY;

                return _react2.default.createElement('div', { className: theme['floaty-target-indicator'], style: { top: y - scrollY, left: x - scrollX, width: width, height: height } });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var dispatch = _props.dispatch;
            var layout = _props.layout;
            var refs = _props.refs;
            var stackControls = _props.stackControls;
            var theme = _props.theme;

            var other = _objectWithoutProperties(_props, ['children', 'dispatch', 'layout', 'refs', 'stackControls', 'theme']);

            return _react2.default.createElement(
                'div',
                _extends({ ref: 'container' }, other),
                this.renderGeneric(dispatch, ['root'], layout),
                this.state.floating && this.renderFloatingStack(),
                this.state.floating && this.renderDropArea()
            );
        }
    }]);

    return Floaty;
}(_SplittablePanel3.default);

Floaty.propTypes = {
    refs: _react2.default.PropTypes.object,
    dispatch: _react2.default.PropTypes.func.isRequired,
    layout: _react2.default.PropTypes.object.isRequired,
    theme: _react2.default.PropTypes.object.isRequired,
    stackControls: _react2.default.PropTypes.any
};
Floaty.childContextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Floaty;
;
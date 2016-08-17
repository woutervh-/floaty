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

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _LayoutUtil = require('./LayoutUtil');

var LayoutUtil = _interopRequireWildcard(_LayoutUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noOp = function noOp() {
    return undefined;
};

var FloatyLayout = function (_React$Component) {
    _inherits(FloatyLayout, _React$Component);

    function FloatyLayout() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, FloatyLayout);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(FloatyLayout)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            floating: null,
            floatingName: '',
            x: 0,
            y: 0,
            targetIndicator: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FloatyLayout, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            var store = this.props.store;

            this.unsubscribe = store.subscribe(function () {
                var layout = store.getState();
                if (LayoutUtil.isLayoutMinimal(layout)) {
                    _this2.forceUpdate();
                } else {
                    var minimalLayout = LayoutUtil.minimizeLayout(layout);
                    store.dispatch((0, _actions.setLayout)(minimalLayout));
                }
            });
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.unsubscribe();
        }
    }, {
        key: 'getChildContext',
        value: function getChildContext() {
            return { theme: this.props.theme };
        }
    }, {
        key: 'dragStart',
        value: function dragStart(stackObject, index, event, dispatch, draggable) {
            var _this3 = this;

            // This will take control of a draggable

            document.body.classList.add(this.props.theme['floaty-unselectable']);

            // Start floating the item
            this.setState({ floating: stackObject.items[index], floatingName: stackObject.names[index], x: event.originalEvent.pageX, y: event.originalEvent.pageY });
            // Remove item from the stack
            dispatch((0, _actions.removeTab)(index));

            draggable.on('drag', function (event) {
                var resolution = _this3.refs['root'].resolveDropArea({ x: event.originalEvent.pageX, y: event.originalEvent.pageY });
                var x = resolution.x;
                var y = resolution.y;
                var width = resolution.width;
                var height = resolution.height;

                _this3.setState({ x: event.originalEvent.pageX, y: event.originalEvent.pageY, targetIndicator: { x: x, y: y, width: width, height: height } });
            });
            draggable.on('dragstop', function (event) {
                document.body.classList.remove(_this3.props.theme['floaty-unselectable']);
                // todo: invoke action is resolution was successful
                // const drop = this.resolveDrop({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
                var resolution = _this3.refs['root'].resolveDropArea({ x: event.originalEvent.pageX, y: event.originalEvent.pageY });
                var drop = false;
                console.log(resolution);
                if (!drop) {
                    // If drop couldn't be resolved => undo delete (add stack item back to stack)
                    // dispatch(insertTab(index, this.state.floating, this.state.floatingName));
                    // dispatch(updateActiveTab(index));
                } else {
                        // If drop was resolved => this.store.dispatch();
                    }
                _this3.setState({ floating: null, floatingName: '' });
                draggable.emit('destroy');
            });
        }
    }, {
        key: 'renderGeneric',
        value: function renderGeneric(dispatch, refAccumulator, genericObject) {
            switch (genericObject.type) {
                case 'row':
                    return this.renderRow(function (update) {
                        return dispatch((0, _actions.updateRow)(update));
                    }, refAccumulator, genericObject);
                case 'stack':
                    return this.renderStack(function (update) {
                        return dispatch((0, _actions.updateStack)(update));
                    }, refAccumulator, genericObject);
                case 'prop-ref':
                    return this.props.refs[genericObject.name];
                case 'child-ref':
                    return this.props.children[genericObject.index];
                case 'component':
                default:
                    return genericObject.content;
            }
        }
    }, {
        key: 'renderRow',
        value: function renderRow(dispatch, refAccumulator, rowObject) {
            var _this4 = this;

            var props = _extends({
                dispatch: dispatch,
                growValues: rowObject.growValues || []
            }, rowObject.props);
            return _react2.default.createElement(
                _Row2.default,
                _extends({ ref: refAccumulator.join('-') }, props),
                rowObject.items.map(function (rowItemObject, index) {
                    return _this4.renderRowItem(function (update) {
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
                { key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, refAccumulator, rowItemObject)
            );
        }
    }, {
        key: 'renderStack',
        value: function renderStack(dispatch, refAccumulator, stackObject) {
            var _this5 = this;

            var props = _extends({
                dispatch: dispatch,
                active: stackObject.active || 0,
                names: stackObject.names || [],
                float: this.dragStart.bind(this, stackObject)
            }, stackObject.props);
            return _react2.default.createElement(
                _Stack2.default,
                _extends({ ref: refAccumulator.join('-') }, props),
                stackObject.items.map(function (stackItemObject, index) {
                    return _this5.renderStackItem(function (update) {
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
                { key: index },
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
            var name = _state.floatingName;

            return _react2.default.createElement(
                _StackFloating2.default,
                { name: name, style: { position: 'fixed', top: this.state.y, left: this.state.x, width: '20vw', height: '20vw' } },
                _react2.default.createElement(
                    _StackItem2.default,
                    null,
                    this.renderGeneric(noOp, ['floating'], stackItemObject)
                )
            );
        }
    }, {
        key: 'renderDropArea',
        value: function renderDropArea() {
            // requires sub-component to be something like:
            // getDropArea(x, y) => (x, y, width, height, dispatch, resolved)

            // const {x, y, width, height} = DomUtil.elementOffset(this.getRef('container'));
            var _state$targetIndicato = this.state.targetIndicator;
            var x = _state$targetIndicato.x;
            var y = _state$targetIndicato.y;
            var width = _state$targetIndicato.width;
            var height = _state$targetIndicato.height;

            return _react2.default.createElement('div', { style: { position: 'fixed', top: y, left: x, width: width, height: height, backgroundColor: 'rgba(0, 0, 0, 0.25)' } });
        }
    }, {
        key: 'resolveGeneric',
        value: function resolveGeneric(position, refAccumulator, genericObject) {
            switch (genericObject.type) {
                case 'row':
                    return this.resolveRow(position, refAccumulator, genericObject);
                case 'stack':
                    return this.resolveStack(position, refAccumulator, genericObject);
                case 'prop-ref':
                case 'child-ref':
                case 'component':
                default:
                    var element = _reactDom2.default.findDOMNode(this.getRef(refAccumulator.join('-')));

                    var _DomUtil$elementOffse = _DomUtil2.default.elementOffset(element);

                    var x = _DomUtil$elementOffse.x;
                    var y = _DomUtil$elementOffse.y;
                    var width = _DomUtil$elementOffse.width;
                    var height = _DomUtil$elementOffse.height;

                    if (x <= position.x && position.x <= x + width && y <= position.y && position.y <= y + height) {
                        return refAccumulator;
                    }
            }
        }
    }, {
        key: 'resolveRow',
        value: function resolveRow(position, refAccumulator, rowObject) {
            var _this6 = this;

            return rowObject.items.map(function (rowItemObject, index) {
                return _this6.resolveGeneric(position, [].concat(_toConsumableArray(refAccumulator), ['rowItem' + index]), rowItemObject);
            }).find(Boolean);
        }
    }, {
        key: 'resolveStack',
        value: function resolveStack(position, refAccumulator, stackObject) {
            var _this7 = this;

            return stackObject.items.map(function (stackItemObject, index) {
                return _this7.resolveGeneric(position, [].concat(_toConsumableArray(refAccumulator), ['stackItem' + index, stackItemObject]));
            }).find(Boolean);
        }
    }, {
        key: 'resolveDrop',
        value: function resolveDrop(position) {
            return this.resolveGeneric(position, ['root'], this.props.store.getState());
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var refs = _props.refs;
            var store = _props.store;
            var theme = _props.theme;

            var other = _objectWithoutProperties(_props, ['refs', 'store', 'theme']);

            return _react2.default.createElement(
                'div',
                _extends({ ref: 'container' }, other),
                this.renderGeneric(store.dispatch, ['root'], store.getState()),
                this.state.floating && this.renderFloatingStack(),
                this.state.floating && this.renderDropArea()
            );
        }
    }]);

    return FloatyLayout;
}(_react2.default.Component);

FloatyLayout.propTypes = {
    refs: _react2.default.PropTypes.object,
    store: _react2.default.PropTypes.any.isRequired,
    theme: _react2.default.PropTypes.object.isRequired
};
FloatyLayout.childContextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = FloatyLayout;
;
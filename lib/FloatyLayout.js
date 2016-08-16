'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
            y: 0
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(FloatyLayout, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.unsubscribe = this.props.store.subscribe(function () {
                return _this2.forceUpdate();
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
        value: function dragStart(stackObject, index, event, draggable) {
            var _this3 = this;

            // This will take control of a draggable
            // Stack item will be removed from stack by stack itself

            document.body.classList.add(this.props.theme['floaty-unselectable']);
            this.setState({ floating: stackObject.items[index], floatingName: stackObject.names[index], x: event.originalEvent.pageX, y: event.originalEvent.pageY });
            draggable.on('drag', function (event) {
                _this3.setState({ x: event.originalEvent.pageX, y: event.originalEvent.pageY });
            });
            draggable.on('dragstop', function () {
                document.body.classList.remove(_this3.props.theme['floaty-unselectable']);
                _this3.setState({ floating: null, floatingName: '' });
                draggable.emit('destroy');
            });
        }
    }, {
        key: 'renderGeneric',
        value: function renderGeneric(dispatch, genericObject) {
            switch (genericObject.type) {
                case 'row':
                    return this.renderRow(function (update) {
                        return dispatch((0, _actions.updateRow)(update));
                    }, genericObject);
                case 'stack':
                    return this.renderStack(function (update) {
                        return dispatch((0, _actions.updateStack)(update));
                    }, genericObject);
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
        value: function renderRow(dispatch, rowObject) {
            var _this4 = this;

            var props = _extends({
                dispatch: dispatch,
                growValues: rowObject.growValues || []
            }, rowObject.props);
            return _react2.default.createElement(
                _Row2.default,
                props,
                rowObject.items.map(function (rowItemObject, index) {
                    return _this4.renderRowItem(function (update) {
                        return dispatch((0, _actions.updateRowItem)(index, update));
                    }, rowItemObject, index);
                })
            );
        }
    }, {
        key: 'renderRowItem',
        value: function renderRowItem(dispatch, rowItemObject, index) {
            return _react2.default.createElement(
                _RowItem2.default,
                { key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, rowItemObject)
            );
        }
    }, {
        key: 'renderStack',
        value: function renderStack(dispatch, stackObject) {
            var _this5 = this;

            var props = _extends({
                dispatch: dispatch,
                active: stackObject.active || 0,
                names: stackObject.names || [],
                float: this.dragStart.bind(this, stackObject)
            }, stackObject.props);
            return _react2.default.createElement(
                _Stack2.default,
                props,
                stackObject.items.map(function (stackItemObject, index) {
                    return _this5.renderStackItem(function (update) {
                        return dispatch((0, _actions.updateStackItem)(index, update));
                    }, stackItemObject, index);
                })
            );
        }
    }, {
        key: 'renderStackItem',
        value: function renderStackItem(dispatch, stackItemObject, index) {
            return _react2.default.createElement(
                _StackItem2.default,
                { key: index },
                this.renderGeneric(function (update) {
                    return dispatch((0, _actions.updateGeneric)(update));
                }, stackItemObject)
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
                    this.renderGeneric(noOp, stackItemObject)
                )
            );
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
                other,
                this.renderGeneric(store.dispatch, store.getState()),
                this.state.floating && this.renderFloatingStack()
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
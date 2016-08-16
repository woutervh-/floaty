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

var _StackItem = require('./StackItem');

var _StackItem2 = _interopRequireDefault(_StackItem);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FloatyComponent = function (_React$Component) {
    _inherits(FloatyComponent, _React$Component);

    function FloatyComponent() {
        _classCallCheck(this, FloatyComponent);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FloatyComponent).apply(this, arguments));
    }

    _createClass(FloatyComponent, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            // TODO: better implementation/get rid of this.forceUpdate in componentWillMount
            return false;
        }
    }, {
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
        key: 'renderGeneric',
        value: function renderGeneric(dispatcher, genericObject) {
            switch (genericObject.type) {
                case 'row':
                    return this.renderRow(function (update) {
                        return dispatcher((0, _actions.updateRow)(update));
                    }, genericObject);
                case 'stack':
                    return this.renderStack(function (update) {
                        return dispatcher((0, _actions.updateStack)(update));
                    }, genericObject);
                case 'prop-ref':
                    return this.props[genericObject.name];
                case 'child-ref':
                    return this.props.children[genericObject.index];
                case 'component':
                default:
                    return genericObject.content;
            }
        }
    }, {
        key: 'renderRow',
        value: function renderRow(dispatcher, rowObject) {
            var _this3 = this;

            var props = _extends({
                dispatcher: dispatcher,
                growValues: rowObject.growValues || []
            }, rowObject.props);
            return _react2.default.createElement(
                _Row2.default,
                props,
                rowObject.items.map(function (rowItemObject, index) {
                    return _this3.renderRowItem(function (update) {
                        return dispatcher((0, _actions.updateRowItem)(index, update));
                    }, rowItemObject, index);
                })
            );
        }
    }, {
        key: 'renderRowItem',
        value: function renderRowItem(dispatcher, rowItemObject, index) {
            return _react2.default.createElement(
                _RowItem2.default,
                _extends({ key: index }, rowItemObject.props),
                this.renderGeneric(function (update) {
                    return dispatcher((0, _actions.updateGeneric)(update));
                }, rowItemObject)
            );
        }
    }, {
        key: 'renderStack',
        value: function renderStack(dispatcher, stackObject) {
            var _this4 = this;

            var props = _extends({
                dispatcher: dispatcher,
                active: stackObject.active || 0,
                names: stackObject.names || []
            }, stackObject.props);
            return _react2.default.createElement(
                _Stack2.default,
                props,
                stackObject.items.map(function (stackItemObject, index) {
                    return _this4.renderStackItem(function (update) {
                        return dispatcher((0, _actions.updateStackItem)(index, update));
                    }, stackItemObject, index);
                })
            );
        }
    }, {
        key: 'renderStackItem',
        value: function renderStackItem(dispatcher, stackItemObject, index) {
            return _react2.default.createElement(
                _StackItem2.default,
                _extends({ key: index }, stackItemObject.props),
                this.renderGeneric(function (update) {
                    return dispatcher((0, _actions.updateGeneric)(update));
                }, stackItemObject)
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var store = this.props.store;

            return this.renderGeneric(store.dispatch, store.getState());
        }
    }]);

    return FloatyComponent;
}(_react2.default.Component);

FloatyComponent.propTypes = {
    store: _react2.default.PropTypes.any.isRequired,
    theme: _react2.default.PropTypes.object.isRequired
};
FloatyComponent.childContextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = FloatyComponent;
;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = LayoutManager;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ContextProvider = require('./ContextProvider');

var _ContextProvider2 = _interopRequireDefault(_ContextProvider);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _RowItem = require('./RowItem');

var _RowItem2 = _interopRequireDefault(_RowItem);

var _Stack = require('./Stack');

var _Stack2 = _interopRequireDefault(_Stack);

var _StackItem = require('./StackItem');

var _StackItem2 = _interopRequireDefault(_StackItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function LayoutManager() {
    var _class, _temp;

    var layout = arguments.length <= 0 || arguments[0] === undefined ? { content: '' } : arguments[0];

    return _temp = _class = function (_React$Component) {
        _inherits(FloatyComponent, _React$Component);

        function FloatyComponent() {
            _classCallCheck(this, FloatyComponent);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(FloatyComponent).apply(this, arguments));
        }

        _createClass(FloatyComponent, [{
            key: 'renderGeneric',
            value: function renderGeneric(genericObject) {
                switch (genericObject.type) {
                    case 'row':
                        return this.renderRow(genericObject);
                    case 'stack':
                        return this.renderStack(genericObject);
                    case 'prop-ref':
                        return this.props[genericObject.name];
                    default:
                        return genericObject.content;
                }
            }
        }, {
            key: 'renderRow',
            value: function renderRow(rowObject) {
                return _react2.default.createElement(
                    _Row2.default,
                    rowObject.props,
                    rowObject.items.map(this.renderRowItem.bind(this))
                );
            }
        }, {
            key: 'renderRowItem',
            value: function renderRowItem(rowItemObject, index) {
                return _react2.default.createElement(
                    _RowItem2.default,
                    _extends({ key: index }, rowItemObject.props),
                    this.renderGeneric(rowItemObject)
                );
            }
        }, {
            key: 'renderStack',
            value: function renderStack(stackObject) {
                return _react2.default.createElement(
                    _Stack2.default,
                    stackObject.props,
                    stackObject.items.map(this.renderStackItem.bind(this))
                );
            }
        }, {
            key: 'renderStackItem',
            value: function renderStackItem(stackItemObject, index) {
                return _react2.default.createElement(
                    _StackItem2.default,
                    _extends({ key: index }, stackItemObject.props, { title: stackItemObject.title }),
                    this.renderGeneric(stackItemObject)
                );
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    _ContextProvider2.default,
                    { theme: this.props.theme },
                    this.renderGeneric(layout)
                );
            }
        }]);

        return FloatyComponent;
    }(_react2.default.Component), _class.propTypes = {
        theme: _react2.default.PropTypes.object.isRequired
    }, _temp;
};
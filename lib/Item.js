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

var _connect = require('react-redux/lib/components/connect');

var _connect2 = _interopRequireDefault(_connect);

var _Column = require('./Column');

var _Column2 = _interopRequireDefault(_Column);

var _Row = require('./Row');

var _Row2 = _interopRequireDefault(_Row);

var _Stack = require('./Stack');

var _Stack2 = _interopRequireDefault(_Stack);

var _selectors = require('./selectors');

var _Types = require('./Types');

var _split = require('./split');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_React$Component) {
    _inherits(Item, _React$Component);

    function Item() {
        _classCallCheck(this, Item);

        return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).apply(this, arguments));
    }

    _createClass(Item, [{
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var type = this.props.type;


            switch (type) {
                case 'column':
                case 'row':
                case 'stack':
                    return this.item.resolveDropArea(position);
                default:
                    var _props = this.props;
                    var id = _props.id;
                    var dispatch = _props.dispatch;

                    return (0, _split2.default)(_reactDom2.default.findDOMNode(this), position, id, dispatch);
            }
        }
    }, {
        key: 'renderLeafComponent',
        value: function renderLeafComponent() {
            var type = this.props.type;
            var refs = this.context.floatyContext.refs;


            var result = void 0;
            switch (type) {
                case 'prop-ref':
                    var name = this.props.name;

                    result = refs[name];
                    break;
                case 'component':
                    var content = this.props.content;

                    result = content;
                    break;
                default:
                    throw new Error('Unknown leaf component type: ' + type);
            }
            var state = this.props.state;

            if (state && _react2.default.isValidElement(result)) {
                return _react2.default.cloneElement(result, _extends({}, state));
            } else if (state && typeof result === 'function') {
                return result(state);
            } else {
                return result;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var type = this.props.type;


            switch (type) {
                case 'column':
                    return _react2.default.createElement(_Column2.default, _extends({ ref: function ref(r) {
                            return _this2.item = r;
                        } }, this.props));
                case 'row':
                    return _react2.default.createElement(_Row2.default, _extends({ ref: function ref(r) {
                            return _this2.item = r;
                        } }, this.props));
                case 'stack':
                    return _react2.default.createElement(_Stack2.default, _extends({ ref: function ref(r) {
                            return _this2.item = r;
                        } }, this.props));
                default:
                    return this.renderLeafComponent();
            }
        }
    }]);

    return Item;
}(_react2.default.Component);

Item.propTypes = {
    id: _react2.default.PropTypes.number.isRequired
};
Item.contextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = (0, _connect2.default)(_selectors.itemSelector, undefined, undefined, { withRef: true })(Item);
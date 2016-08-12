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

var _RowSeparator = require('./RowSeparator');

var _RowSeparator2 = _interopRequireDefault(_RowSeparator);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        var _Object$getPrototypeO;

        var _temp, _this, _ret;

        _classCallCheck(this, Row);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Row)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
            offsets: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Row, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resizeOffsets(this.props.children.length - 1);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (nextProps.children.length != this.state.offsets.length) {
                this.resizeOffsets(nextProps.children.length - 1);
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.ensureOffsets();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.ensureOffsets();
        }
    }, {
        key: 'resizeOffsets',
        value: function resizeOffsets(length) {
            var offsets = [];
            for (var i = 0; i < length; i++) {
                offsets.push(i < this.state.offsets.length ? this.state.offsets[i] : 0);
            }
            this.setState({ offsets: offsets });
        }
    }, {
        key: 'ensureOffsets',
        value: function ensureOffsets() {
            var offsets = [].concat(_toConsumableArray(this.state.offsets));
            for (var i = 0; i < this.state.offsets.length; i++) {
                var rowItem = _reactDom2.default.findDOMNode(this.refs['row-item-' + i]);
                var style = window.getComputedStyle(rowItem);
                var regExp = /^(\d+(\.\d+)?)px$/;
                var flexBasis = parseFloat(style.getPropertyValue('flex-basis').match(regExp)[1]);
                var width = parseFloat(style.getPropertyValue('width').match(regExp)[1]);
                if (width != flexBasis) {
                    offsets[i] += width - flexBasis;
                }
            }
            if (!(0, _shallowequal2.default)(this.state.offsets, offsets)) {
                this.setState({ offsets: offsets });
            }
        }
    }, {
        key: 'renderRowItem',
        value: function renderRowItem(rowItem, offset, index) {
            var style = 'style' in rowItem.props && rowItem.props.style || {};
            var basis = 'style' in rowItem.props && 'flexBasis' in rowItem.props.style && rowItem.props.style.flexBasis || '0px';
            return _react2.default.cloneElement(rowItem, { ref: 'row-item-' + index, style: _extends({}, style, { flexBasis: 'calc(' + basis + ' + ' + offset + 'px)' }) });
        }
    }, {
        key: 'renderRowItems',
        value: function renderRowItems(rows) {
            var result = [];
            for (var i = 0; i < rows.length; i++) {
                if (i > 0) {
                    result.push(_react2.default.createElement(_RowSeparator2.default, { onPositionChange: this.handlePositionChange.bind(this, i - 1) }));
                }
                result.push(this.renderRowItem(rows[i], i == rows.length - 1 ? 0 : this.state.offsets[i], i));
            }
            return result;
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(index, offset) {
            var offsets = [].concat(_toConsumableArray(this.state.offsets));
            offsets[index] += offset;
            this.setState({ offsets: offsets });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;

            var other = _objectWithoutProperties(_props, ['children', 'className']);

            var theme = this.context.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-row'], className) }, other),
                this.renderRowItems(children).map(function (item, index) {
                    return _react2.default.cloneElement(item, { key: index });
                })
            );
        }
    }]);

    return Row;
}(_react2.default.Component);

Row.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Row;
;
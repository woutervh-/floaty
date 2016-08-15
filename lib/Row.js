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

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

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
            growValues: []
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Row, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resizeRowValues(_react2.default.Children.count(this.props.children));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (_react2.default.Children.count(nextProps.children) != this.state.growValues.length) {
                this.resizeRowValues(_react2.default.Children.count(nextProps.children));
            }
        }
    }, {
        key: 'resizeRowValues',
        value: function resizeRowValues(length) {
            var growValues = [];
            for (var i = 0; i < length; i++) {
                growValues.push(i < this.state.growValues.length ? this.state.growValues[i] : 1);
            }
            this.setState({ growValues: growValues });
        }
    }, {
        key: 'renderRowItems',
        value: function renderRowItems(children) {
            var result = [];
            var rows = _react2.default.Children.toArray(children);
            for (var i = 0; i < rows.length; i++) {
                if (i > 0) {
                    result.push(_react2.default.createElement(_RowSeparator2.default, { getBounds: this.getBoundsForSeparator.bind(this, i - 1), onPositionChange: this.handlePositionChange.bind(this, i - 1) }));
                }
                var rowItem = rows[i];
                var growValue = this.state.growValues[i];
                var style = 'props' in rowItem && 'style' in rowItem.props && rowItem.props.style || {};
                var element = _react2.default.cloneElement(rowItem, { ref: 'row-item-' + i, style: _extends({}, style, { flexGrow: growValue }) });
                result.push(element);
            }
            return result;
        }
    }, {
        key: 'getWidthForRowItemIndex',
        value: function getWidthForRowItemIndex(index) {
            return this.getWidthForRowItem(_reactDom2.default.findDOMNode(this.refs['row-item-' + index]));
        }
    }, {
        key: 'getWidthForRowItem',
        value: function getWidthForRowItem(rowItem) {
            var regExp = /^(\d+(\.\d+)?)px$/;
            return parseFloat(window.getComputedStyle(rowItem).getPropertyValue('width').match(regExp)[1]);
        }
    }, {
        key: 'getBoundsForSeparator',
        value: function getBoundsForSeparator(index) {
            var widthA = this.getWidthForRowItemIndex(index);
            var widthB = this.getWidthForRowItemIndex(index + 1);
            return { min: -widthA, max: widthB };
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(index, offset) {
            var widthA = this.getWidthForRowItemIndex(index);
            var widthB = this.getWidthForRowItemIndex(index + 1);
            var widthSum = widthA + widthB;
            var growValuesSum = this.state.growValues[index] + this.state.growValues[index + 1];
            var fraction = (widthA + offset) / widthSum;
            var growValues = [].concat(_toConsumableArray(this.state.growValues));
            growValues[index] = fraction * growValuesSum;
            growValues[index + 1] = (1 - fraction) * growValuesSum;
            this.setState({ growValues: growValues });
        }
    }, {
        key: 'getDropArea',
        value: function getDropArea(mouseX, mouseY) {
            var area = undefined;

            var _DomUtil$elementOffse = _DomUtil2.default.elementOffset(this.refs['container']);

            var containerY = _DomUtil$elementOffse.y;
            var containerWidth = _DomUtil$elementOffse.width;
            var containerHeight = _DomUtil$elementOffse.height;

            var count = _react2.default.Children.count(this.props.children);
            for (var i = 0; i < count; i++) {
                var _DomUtil$elementOffse2 = _DomUtil2.default.elementOffset(this.refs['row-item-' + index]);

                var x = _DomUtil$elementOffse2.x;
                var y = _DomUtil$elementOffse2.y;
                var width = _DomUtil$elementOffse2.width;
                var height = _DomUtil$elementOffse2.height;

                if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height) {
                    area = { x: x, y: containerY, width: containerWidth / count, height: containerHeight };
                }
            }
            return area;
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
                _extends({ ref: 'container', className: (0, _classnames2.default)(theme['floaty-row'], className) }, other),
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

// import {connect} from 'react-redux';
//
// function Row() {
//
// }
//
// export default connect(state => ({theme: state.theme}), {})(Row);
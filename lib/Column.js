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

var _ColumnSeparator = require('./ColumnSeparator');

var _ColumnSeparator2 = _interopRequireDefault(_ColumnSeparator);

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Column = function (_React$Component) {
    _inherits(Column, _React$Component);

    function Column() {
        _classCallCheck(this, Column);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Column).apply(this, arguments));
    }

    _createClass(Column, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContent) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContent);
        }
    }, {
        key: 'getHeightForColumnItem',
        value: function getHeightForColumnItem(index) {
            var columnItem = _reactDom2.default.findDOMNode(this.refs['column-item-' + index]);
            return parseFloat(window.getComputedStyle(columnItem)['height']);
        }
    }, {
        key: 'getBoundsForSeparator',
        value: function getBoundsForSeparator(index) {
            var heightA = this.getHeightForColumnItem(index);
            var heightB = this.getHeightForColumnItem(index + 1);
            return { min: -heightA, max: heightB };
        }
    }, {
        key: 'renderColumnItems',
        value: function renderColumnItems(children) {
            var growValues = this.props.growValues;

            var result = [];
            var columns = _react2.default.Children.toArray(children);
            var growValuesSum = 0;
            for (var i = 0; i < columns.length; i++) {
                growValuesSum += growValues[i];
            }
            for (var _i = 0; _i < columns.length; _i++) {
                if (_i > 0) {
                    result.push(_react2.default.createElement(_ColumnSeparator2.default, { getBounds: this.getBoundsForSeparator.bind(this, _i - 1), onPositionChange: this.handlePositionChange.bind(this, _i - 1) }));
                }
                var columnItem = columns[_i];
                var growValue = growValues[_i] / growValuesSum;
                var style = 'props' in columnItem && 'style' in columnItem.props && columnItem.props.style || {};
                var element = _react2.default.cloneElement(columnItem, { ref: 'column-item-' + _i, style: _extends({}, style, { flexGrow: growValue }) });
                result.push(element);
            }
            return result;
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(index, offset) {
            var widthA = this.getHeightForColumnItem(index);
            var widthB = this.getHeightForColumnItem(index + 1);
            var widthSum = widthA + widthB;
            var growValuesSum = this.props.growValues[index] + this.props.growValues[index + 1];
            var fraction = (widthA + offset) / widthSum;
            var growValues = [].concat(_toConsumableArray(this.props.growValues));
            growValues[index] = fraction * growValuesSum;
            growValues[index + 1] = (1 - fraction) * growValuesSum;
            this.props.dispatch((0, _actions.updateGrowValues)(growValues));
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
                var element = _reactDom2.default.findDOMNode(this.refs['column-item-' + i]);
                var box = _DomUtil2.default.elementOffset(element);
                if (_DomUtil2.default.isWithinBox(position, box)) {
                    return this.refs['column-item-' + i].resolveDropArea(position);
                }
            }
            return { x: 0, y: 0, width: 0, height: 0, dispatch: _actions.noOperation, resolved: false };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;
            var dispatch = _props.dispatch;
            var growValues = _props.growValues;

            var other = _objectWithoutProperties(_props, ['children', 'className', 'dispatch', 'growValues']);

            var theme = this.context.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-column'], className) }, other),
                this.renderColumnItems(children).map(function (item, index) {
                    return _react2.default.cloneElement(item, { key: index });
                })
            );
        }
    }]);

    return Column;
}(_react2.default.Component);

Column.propTypes = {
    dispatch: _react2.default.PropTypes.func.isRequired,
    growValues: _react2.default.PropTypes.array.isRequired
};
Column.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Column;
;
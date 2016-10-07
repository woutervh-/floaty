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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _RowSeparator = require('./RowSeparator');

var _RowSeparator2 = _interopRequireDefault(_RowSeparator);

var _RowItem = require('./RowItem');

var _RowItem2 = _interopRequireDefault(_RowItem);

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

var _selectors = require('./selectors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, (Row.__proto__ || Object.getPrototypeOf(Row)).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContext);
        }
    }, {
        key: 'getWidthForRowItem',
        value: function getWidthForRowItem(index) {
            var rowItem = _reactDom2.default.findDOMNode(this['row-item-' + index]);
            return parseFloat(window.getComputedStyle(rowItem)['width']);
        }
    }, {
        key: 'getBoundsForSeparator',
        value: function getBoundsForSeparator(index) {
            var widthA = this.getWidthForRowItem(index);
            var widthB = this.getWidthForRowItem(index + 1);
            return { min: -widthA, max: widthB };
        }
    }, {
        key: 'renderRowItems',
        value: function renderRowItems() {
            var _this2 = this;

            var _props = this.props;
            var items = _props.items;
            var _props$growValues = _props.growValues;
            var growValues = _props$growValues === undefined ? [] : _props$growValues;

            var result = [];
            var growValuesSum = 0;
            for (var i = 0; i < items.length; i++) {
                growValuesSum += growValues[i] || 1;
            }

            var _loop = function _loop(_i) {
                if (_i > 0) {
                    result.push(_react2.default.createElement(_RowSeparator2.default, { key: 2 * _i - 1, getBounds: _this2.getBoundsForSeparator.call(_this2, _i - 1), onPositionChange: _this2.handlePositionChange.call(_this2, _i - 1) }));
                }
                var growValue = (growValues[_i] || 1) / growValuesSum;
                var element = _react2.default.createElement(_RowItem2.default, { key: 2 * _i, ref: function ref(r) {
                        return _this2['row-item-' + _i] = r;
                    }, id: items[_i], style: { flexGrow: growValue } });
                result.push(element);
            };

            for (var _i = 0; _i < items.length; _i++) {
                _loop(_i);
            }
            return result;
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(index, offset) {
            var _props2 = this.props;
            var id = _props2.id;
            var dispatch = _props2.dispatch;
            var _props2$growValues = _props2.growValues;
            var growValues = _props2$growValues === undefined ? [] : _props2$growValues;

            var widthA = this.getWidthForRowItem(index);
            var widthB = this.getWidthForRowItem(index + 1);
            var widthSum = widthA + widthB;
            var growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
            var fraction = (widthA + offset) / widthSum;
            var newGrowValues = [].concat(_toConsumableArray(growValues));
            newGrowValues[index] = fraction * growValuesSum;
            newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
            dispatch((0, _actions.updateGrowValues)(newGrowValues));
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            for (var i = 0; i < _react2.default.Children.count(this.props.children); i++) {
                var element = _reactDom2.default.findDOMNode(this['row-item-' + i]);
                var box = _DomUtil2.default.elementOffset(element);
                if (_DomUtil2.default.isWithinBox(position, box)) {
                    return this['row-item-' + i].resolveDropArea(position);
                }
            }
            return { x: 0, y: 0, width: 0, height: 0, dispatch: _actions.noOperation, resolved: false };
        }
    }, {
        key: 'render',
        value: function render() {
            var _props3 = this.props;
            var className = _props3.className;
            var dispatch = _props3.dispatch;
            var id = _props3.id;
            var growValues = _props3.growValues;
            var items = _props3.items;

            var other = _objectWithoutProperties(_props3, ['className', 'dispatch', 'id', 'growValues', 'items']);

            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-row'], className) }, other),
                this.renderRowItems()
            );
        }
    }]);

    return Row;
}(_react2.default.Component);

Row.propTypes = {
    id: _react2.default.PropTypes.number.isRequired,
    growValues: _react2.default.PropTypes.array,
    items: _react2.default.PropTypes.array.isRequired
};
Row.contextTypes = {
    floatyContext: _react2.default.PropTypes.shape({
        refs: _react2.default.PropTypes.object.isRequired,
        theme: _react2.default.PropTypes.object.isRequired
    }).isRequired
};
exports.default = (0, _connect2.default)(_selectors.rowSelector)(Row);
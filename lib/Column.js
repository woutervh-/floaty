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

var _ColumnItem = require('./ColumnItem');

var _ColumnItem2 = _interopRequireDefault(_ColumnItem);

var _DomUtil = require('./DomUtil');

var DomUtil = _interopRequireWildcard(_DomUtil);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _actions = require('./actions');

var _Types = require('./Types');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

        return _possibleConstructorReturn(this, (Column.__proto__ || Object.getPrototypeOf(Column)).apply(this, arguments));
    }

    _createClass(Column, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.context, nextContext);
        }
    }, {
        key: 'getHeightForColumnItem',
        value: function getHeightForColumnItem(index) {
            var columnItem = _reactDom2.default.findDOMNode(this['column-item-' + index]);
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
        value: function renderColumnItems() {
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
                    result.push(_react2.default.createElement(_ColumnSeparator2.default, { key: 2 * _i - 1, getBounds: function getBounds() {
                            return _this2.getBoundsForSeparator(_i - 1);
                        }, onPositionChange: function onPositionChange(offset) {
                            return _this2.handlePositionChange(_i - 1, offset);
                        } }));
                }
                var growValue = (growValues[_i] || 1) / growValuesSum;
                var element = _react2.default.createElement(_ColumnItem2.default, { key: 2 * _i, ref: function ref(r) {
                        return _this2['column-item-' + _i] = r;
                    }, value: items[_i], style: { flexGrow: growValue } });
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

            var heightA = this.getHeightForColumnItem(index);
            var heightB = this.getHeightForColumnItem(index + 1);
            var heightSum = heightA + heightB;
            var growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
            var fraction = (heightA + offset) / heightSum;
            var newGrowValues = [].concat(_toConsumableArray(growValues));
            newGrowValues[index] = fraction * growValuesSum;
            newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
            dispatch((0, _actions.setGrowValues)(id, newGrowValues));
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var items = this.props.items;

            for (var i = 0; i < items.length; i++) {
                var element = _reactDom2.default.findDOMNode(this['column-item-' + i]);
                var box = DomUtil.elementOffset(element);
                if (DomUtil.isWithinBox(position, box)) {
                    return this['column-item-' + i].resolveDropArea(position);
                }
            }
            return { x: 0, y: 0, width: 0, height: 0, resolved: false };
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
            var type = _props3.type;

            var other = _objectWithoutProperties(_props3, ['className', 'dispatch', 'id', 'growValues', 'items', 'type']);

            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-column'], className) }, other),
                this.renderColumnItems()
            );
        }
    }]);

    return Column;
}(_react2.default.Component);

Column.propTypes = {
    growValues: _react2.default.PropTypes.array,
    items: _react2.default.PropTypes.array.isRequired
};
Column.contextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = Column;
;
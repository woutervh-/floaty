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

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// export default class Row extends React.Component {
//     static contextTypes = {
//         theme: React.PropTypes.object.isRequired
//     };
//
//     state = {
//         growValues: []
//     };
//
//     componentWillMount() {
//         this.resizeRowValues(React.Children.count(this.props.children));
//     }
//
//     componentWillReceiveProps(nextProps) {
//         if (React.Children.count(nextProps.children) != this.state.growValues.length) {
//             this.resizeRowValues(React.Children.count(nextProps.children));
//         }
//     }
//
//     resizeRowValues(length) {
//         const growValues = [];
//         for (let i = 0; i < length; i++) {
//             growValues.push(i < this.state.growValues.length ? this.state.growValues[i] : 1);
//         }
//         this.setState({growValues});
//     }
//
//     renderRowItems(children) {
//         const result = [];
//         const rows = React.Children.toArray(children);
//         for (let i = 0; i < rows.length; i++) {
//             if (i > 0) {
//                 result.push(<RowSeparator getBounds={this.getBoundsForSeparator.bind(this, i - 1)} onPositionChange={this.handlePositionChange.bind(this, i - 1)}/>);
//             }
//             const rowItem = rows[i];
//             const growValue = this.state.growValues[i];
//             const style = 'props' in rowItem && 'style' in rowItem.props && rowItem.props.style || {};
//             const element = React.cloneElement(rowItem, {ref: 'row-item-' + i, style: {...style, flexGrow: growValue}});
//             result.push(element);
//         }
//         return result;
//     }
//
//     getWidthForRowItemIndex(index) {
//         return this.getWidthForRowItem(ReactDOM.findDOMNode(this.refs['row-item-' + index]));
//     }
//
//     getWidthForRowItem(rowItem) {
//         const regExp = /^(\d+(\.\d+)?)px$/;
//         return parseFloat(window.getComputedStyle(rowItem).getPropertyValue('width').match(regExp)[1]);
//     }
//
//     getBoundsForSeparator(index) {
//         const widthA = this.getWidthForRowItemIndex(index);
//         const widthB = this.getWidthForRowItemIndex(index + 1);
//         return {min: -widthA, max: widthB};
//     }
//
//     handlePositionChange(index, offset) {
//         const widthA = this.getWidthForRowItemIndex(index);
//         const widthB = this.getWidthForRowItemIndex(index + 1);
//         const widthSum = widthA + widthB;
//         const growValuesSum = this.state.growValues[index] + this.state.growValues[index + 1];
//         const fraction = (widthA + offset) / widthSum;
//         const growValues = [...this.state.growValues];
//         growValues[index] = fraction * growValuesSum;
//         growValues[index + 1] = (1 - fraction) * growValuesSum;
//         this.setState({growValues});
//     }
//
//     getDropArea(mouseX, mouseY) {
//         let area = undefined;
//         const {y: containerY, width: containerWidth, height: containerHeight} = DomUtil.elementOffset(this.refs['container']);
//         const count = React.Children.count(this.props.children);
//         for (let i = 0; i < count; i++) {
//             const {x, y, width, height} = DomUtil.elementOffset(this.refs['row-item-' + index]);
//             if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height) {
//                 area = {x, y: containerY, width: containerWidth / count, height: containerHeight};
//             }
//         }
//         return area;
//     }
//
//     render() {
//         const {children, className, ...other} = this.props;
//         const {theme} = this.context;
//
//         return <div ref="container" className={classNames(theme['floaty-row'], className)} {...other}>
//             {this.renderRowItems(children).map((item, index) => React.cloneElement(item, {key: index}))}
//         </div>;
//     }
// };

var Row = function (_React$Component) {
    _inherits(Row, _React$Component);

    function Row() {
        _classCallCheck(this, Row);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Row).apply(this, arguments));
    }

    _createClass(Row, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resizeRowValues(_react2.default.Children.count(this.props.children));
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (_react2.default.Children.count(nextProps.children) != this.props.growValues.length) {
                this.resizeRowValues(_react2.default.Children.count(nextProps.children));
            }
        }
    }, {
        key: 'resizeRowValues',
        value: function resizeRowValues(length) {
            var growValues = [];
            for (var i = 0; i < length; i++) {
                growValues.push(i < this.props.growValues.length ? this.props.growValues[i] : 1);
            }
            this.props.dispatcher((0, _actions.updateGrowValues)(growValues));
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
        key: 'renderRowItems',
        value: function renderRowItems(children) {
            var result = [];
            var rows = _react2.default.Children.toArray(children);
            for (var i = 0; i < rows.length; i++) {
                if (i > 0) {
                    result.push(_react2.default.createElement(_RowSeparator2.default, { getBounds: this.getBoundsForSeparator.bind(this, i - 1), onPositionChange: this.handlePositionChange.bind(this, i - 1) }));
                }
                var rowItem = rows[i];
                var growValue = this.props.growValues[i];
                var style = 'props' in rowItem && 'style' in rowItem.props && rowItem.props.style || {};
                var element = _react2.default.cloneElement(rowItem, { ref: 'row-item-' + i, style: _extends({}, style, { flexGrow: growValue }) });
                result.push(element);
            }
            return result;
        }
    }, {
        key: 'handlePositionChange',
        value: function handlePositionChange(index, offset) {
            var widthA = this.getWidthForRowItemIndex(index);
            var widthB = this.getWidthForRowItemIndex(index + 1);
            var widthSum = widthA + widthB;
            var growValuesSum = this.props.growValues[index] + this.props.growValues[index + 1];
            var fraction = (widthA + offset) / widthSum;
            var growValues = [].concat(_toConsumableArray(this.props.growValues));
            growValues[index] = fraction * growValuesSum;
            growValues[index + 1] = (1 - fraction) * growValuesSum;
            this.props.dispatcher((0, _actions.updateGrowValues)(growValues));
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var className = _props.className;
            var dispatcher = _props.dispatcher;
            var growValues = _props.growValues;

            var other = _objectWithoutProperties(_props, ['children', 'className', 'dispatcher', 'growValues']);

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

Row.propTypes = {
    dispatcher: _react2.default.PropTypes.func.isRequired,
    growValues: _react2.default.PropTypes.array.isRequired
};
Row.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Row;
;
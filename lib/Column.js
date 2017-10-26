"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var classNames = require("classnames");
var ColumnSeparator_1 = require("./ColumnSeparator");
var ColumnItem_1 = require("./ColumnItem");
var DomUtil = require("./DomUtil");
var shallowEqual = require("shallowequal");
var actions_1 = require("./actions");
var Types_1 = require("./Types");
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = {};
        return _this;
    }
    Column.prototype.shouldComponentUpdate = function (nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    };
    Column.prototype.getHeightForColumnItem = function (index) {
        var columnItem = ReactDOM.findDOMNode(this.items['column-item-' + index]);
        return parseFloat(window.getComputedStyle(columnItem)['height'] || '0');
    };
    Column.prototype.getBoundsForSeparator = function (index) {
        var heightA = this.getHeightForColumnItem(index);
        var heightB = this.getHeightForColumnItem(index + 1);
        return { min: -heightA, max: heightB };
    };
    Column.prototype.renderColumnItems = function () {
        var _this = this;
        var _a = this.props, items = _a.items, _b = _a.growValues, growValues = _b === void 0 ? [] : _b;
        var result = [];
        var growValuesSum = 0;
        for (var i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        var _loop_1 = function (i) {
            if (i > 0) {
                result.push(React.createElement(ColumnSeparator_1.ColumnSeparator, { key: 2 * i - 1, getBounds: function () { return _this.getBoundsForSeparator(i - 1); }, onPositionChange: function (offset) { return _this.handlePositionChange(i - 1, offset); } }));
            }
            var growValue = (growValues[i] || 1) / growValuesSum;
            var element = React.createElement(ColumnItem_1.default, { key: 2 * i, ref: function (r) {
                    if (r === null) {
                        delete _this.items['column-item-' + i];
                    }
                    else {
                        _this.items['column-item-' + i] = r;
                    }
                }, value: items[i], style: { flexGrow: growValue } });
            result.push(element);
        };
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
        return result;
    };
    Column.prototype.handlePositionChange = function (index, offset) {
        var _a = this.props, id = _a.id, dispatch = _a.dispatch, _b = _a.growValues, growValues = _b === void 0 ? [] : _b;
        var heightA = this.getHeightForColumnItem(index);
        var heightB = this.getHeightForColumnItem(index + 1);
        var heightSum = heightA + heightB;
        var growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        var fraction = (heightA + offset) / heightSum;
        var newGrowValues = growValues.slice();
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(actions_1.setGrowValues(id, newGrowValues));
    };
    Column.prototype.resolveDropArea = function (position) {
        var items = this.props.items;
        for (var i = 0; i < items.length; i++) {
            var element = ReactDOM.findDOMNode(this.items['column-item-' + i]);
            var box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.items['column-item-' + i].resolveDropArea(position);
            }
        }
        return { x: 0, y: 0, width: 0, height: 0, resolved: false };
    };
    Column.prototype.render = function () {
        var _a = this.props, className = _a.className, dispatch = _a.dispatch, id = _a.id, growValues = _a.growValues, items = _a.items, type = _a.type, other = __rest(_a, ["className", "dispatch", "id", "growValues", "items", "type"]);
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", __assign({ className: classNames(theme['floaty-column'], className) }, other), this.renderColumnItems());
    };
    Column.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return Column;
}(React.Component));
exports.default = Column;
;
//# sourceMappingURL=Column.js.map
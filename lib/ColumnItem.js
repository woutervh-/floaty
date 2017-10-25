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
var classNames = require("classnames");
var shallowEqual = require("shallowequal");
var Item_1 = require("./Item");
var Types_1 = require("./Types");
var ColumnItem = /** @class */ (function (_super) {
    __extends(ColumnItem, _super);
    function ColumnItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnItem.prototype.shouldComponentUpdate = function (nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    };
    ColumnItem.prototype.resolveDropArea = function (position) {
        var value = this.props.value;
        return this.item.resolveDropArea(position);
    };
    ColumnItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, value = _a.value, other = __rest(_a, ["className", "value"]);
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", __assign({ className: classNames(theme['floaty-column-item'], className) }, other),
            React.createElement(Item_1.Item, { ref: function (r) {
                    if (r !== null) {
                        _this.item = r['wrappedInstance'];
                    }
                }, id: value }));
    };
    ColumnItem.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return ColumnItem;
}(React.Component));
exports.default = ColumnItem;
;
//# sourceMappingURL=ColumnItem.js.map
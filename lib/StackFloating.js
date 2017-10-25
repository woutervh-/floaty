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
var Types_1 = require("./Types");
var StackItem_1 = require("./StackItem");
var Item_1 = require("./Item");
var StackFloating = /** @class */ (function (_super) {
    __extends(StackFloating, _super);
    function StackFloating() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackFloating.prototype.shouldComponentUpdate = function (nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    };
    StackFloating.prototype.renderHeaderTab = function () {
        var title = this.props.title;
        var theme = this.context.floatyContext.theme;
        return React.createElement("li", { className: classNames(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active']) },
            React.createElement(Item_1.Item, { id: title }));
    };
    StackFloating.prototype.renderHeaderTabs = function () {
        var theme = this.context.floatyContext.theme;
        return React.createElement("ul", { className: theme['floaty-stack-header-tabs'] }, this.renderHeaderTab());
    };
    StackFloating.prototype.renderHeader = function () {
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", { className: theme['floaty-stack-header'] }, this.renderHeaderTabs());
    };
    StackFloating.prototype.render = function () {
        var _a = this.props, className = _a.className, title = _a.title, item = _a.item, style = _a.style, x = _a.x, y = _a.y, other = __rest(_a, ["className", "title", "item", "style", "x", "y"]);
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", __assign({ className: classNames(theme['floaty-stack'], theme['floaty-stack-floating'], className), style: __assign({}, style, { top: y, left: x }) }, other),
            this.renderHeader(),
            React.createElement(StackItem_1.default, { value: item }));
    };
    StackFloating.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return StackFloating;
}(React.Component));
exports.default = StackFloating;
;
//# sourceMappingURL=StackFloating.js.map
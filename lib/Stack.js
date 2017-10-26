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
var Draggable_1 = require("./Draggable");
var DomUtil = require("./DomUtil");
var shallowEqual = require("shallowequal");
var actions_1 = require("./actions");
var StackItem_1 = require("./StackItem");
var Types_1 = require("./Types");
var split_1 = require("./split");
var Item_1 = require("./Item");
var Stack = /** @class */ (function (_super) {
    __extends(Stack, _super);
    function Stack() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tabs = {};
        _this.unmakeDraggablesTimeout = null;
        _this.draggables = [];
        return _this;
    }
    Stack.prototype.shouldComponentUpdate = function (nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    };
    Stack.prototype.componentDidMount = function () {
        this.makeDraggables();
    };
    Stack.prototype.componentWillUpdate = function () {
        this.unmakeDraggables();
    };
    Stack.prototype.componentDidUpdate = function () {
        var _this = this;
        this.unmakeDraggables(function () { return _this.makeDraggables(); });
    };
    Stack.prototype.componentWillUnmount = function () {
        this.unmakeDraggables();
    };
    Stack.prototype.makeDraggables = function () {
        var _this = this;
        var items = this.props.items;
        var _loop_1 = function (i) {
            var draggable = Draggable_1.default(ReactDOM.findDOMNode(this_1.tabs['tab-' + i]), 5);
            draggable.on('dragstart', function () { return _this.handleDragStart(i); });
            this_1.draggables.push(draggable);
        };
        var this_1 = this;
        for (var i = 0; i < items.length; i++) {
            _loop_1(i);
        }
    };
    Stack.prototype.unmakeDraggables = function (callback) {
        var _this = this;
        if (callback === void 0) { callback = function () { return undefined; }; }
        var unmakeDraggablesTimeout = this.unmakeDraggablesTimeout;
        if (unmakeDraggablesTimeout !== null) {
            window.clearTimeout(unmakeDraggablesTimeout);
        }
        if (this.draggables.length === 0) {
            this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
        }
        else {
            var destroyedCount_1 = 0;
            this.draggables.forEach(function (draggable) { return draggable.on('destroyed', function () {
                if (++destroyedCount_1 == _this.draggables.length) {
                    _this.draggables = [];
                    _this.tabs = {};
                    _this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
                }
            }); });
            this.draggables.forEach(function (draggable) { return draggable.emit('destroy'); });
        }
    };
    Stack.prototype.handleDragStart = function (index) {
        var _a = this.props, id = _a.id, dispatch = _a.dispatch, items = _a.items, titles = _a.titles;
        var float = this.context.floatyContext.float;
        this.draggables.splice(index, 1)[0].emit('destroy');
        float(items[index], titles[index]);
        dispatch(actions_1.removeTab(id, index));
    };
    Stack.prototype.handleTabClick = function (index) {
        var _a = this.props, id = _a.id, dispatch = _a.dispatch;
        dispatch(actions_1.setActiveTab(id, index));
    };
    Stack.prototype.resolveDropArea = function (position) {
        var headerElement = this.header;
        var headerBox = DomUtil.elementOffset(headerElement);
        if (DomUtil.isWithinBox(position, headerBox)) {
            var _a = this.props, dispatch_1 = _a.dispatch, id_1 = _a.id, items_1 = _a.items;
            var _loop_2 = function (i) {
                var tabElement = this_2.tabs['tab-' + i];
                var tabBox = DomUtil.elementOffset(tabElement);
                if (DomUtil.isWithinBox(position, tabBox)) {
                    return { value: {
                            x: tabBox.x,
                            y: tabBox.y,
                            width: tabBox.width,
                            height: tabBox.height,
                            execute: function (item, title) { return dispatch_1(actions_1.insertTab(id_1, i, item, title)); },
                            resolved: true
                        } };
                }
            };
            var this_2 = this;
            for (var i = 0; i < items_1.length; i++) {
                var state_1 = _loop_2(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            return {
                x: headerBox.x,
                y: headerBox.y,
                width: headerBox.width,
                height: headerBox.height,
                execute: function (item, title) { return dispatch_1(actions_1.insertTab(id_1, items_1.length, item, title)); },
                resolved: true
            };
        }
        else {
            var containerElement = this.container;
            var containerBox = DomUtil.elementOffset(containerElement);
            if (DomUtil.isWithinBox(position, containerBox)) {
                var _b = this.props, dispatch = _b.dispatch, id = _b.id;
                return split_1.default(containerElement, position, id, dispatch);
            }
            else {
                return { x: 0, y: 0, width: 0, height: 0, resolved: false };
            }
        }
    };
    Stack.prototype.renderTabs = function () {
        var _this = this;
        var _a = this.props, id = _a.id, active = _a.active, titles = _a.titles;
        var theme = this.context.floatyContext.theme;
        return React.createElement("ul", { className: theme['floaty-stack-header-tabs'] }, titles.map(function (title, index) {
            return React.createElement("li", { key: index, ref: function (r) {
                    if (r !== null) {
                        _this.tabs['tab-' + index] = r;
                    }
                }, className: classNames(theme['floaty-stack-header-tabs-item'], (_a = {}, _a[theme['floaty-stack-header-tabs-item-active']] = index === active, _a)), onClick: function () { return _this.handleTabClick(index); } },
                React.createElement(Item_1.Item, { id: title, floatyStackId: id, floatyStackIndex: index }));
            var _a;
        }));
    };
    Stack.prototype.renderHeader = function () {
        var _this = this;
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", { ref: function (r) {
                if (r !== null) {
                    _this.header = r;
                }
            }, className: theme['floaty-stack-header'] }, this.renderTabs());
    };
    Stack.prototype.render = function () {
        var _this = this;
        var _a = this.props, active = _a.active, items = _a.items, className = _a.className, id = _a.id, dispatch = _a.dispatch, titles = _a.titles, type = _a.type, other = __rest(_a, ["active", "items", "className", "id", "dispatch", "titles", "type"]);
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", __assign({ ref: function (r) {
                if (r !== null) {
                    _this.container = r;
                }
            }, className: classNames(theme['floaty-stack'], className) }, other),
            this.renderHeader(),
            0 <= active && active < items.length && React.createElement(StackItem_1.default, { value: items[active] }));
    };
    Stack.defaultProps = {
        active: 0
    };
    Stack.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return Stack;
}(React.Component));
exports.default = Stack;
;
//# sourceMappingURL=Stack.js.map
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
var shallowEqual = require("shallowequal");
var react_redux_1 = require("react-redux");
var Column_1 = require("./Column");
var Row_1 = require("./Row");
var Stack_1 = require("./Stack");
var selectors_1 = require("./selectors");
var Types_1 = require("./Types");
var split_1 = require("./split");
// IFloatyItemProps & IFloatyItemSelectedProps & React.Props<ItemBase> & {dispatch: Redux.Dispatch<IFloatyState>}
var ItemBase = /** @class */ (function (_super) {
    __extends(ItemBase, _super);
    function ItemBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBase.prototype.shouldComponentUpdate = function (nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    };
    ItemBase.prototype.resolveDropArea = function (position) {
        var type = this.props.type;
        switch (type) {
            case 'column':
            case 'row':
            case 'stack':
                return this.item.resolveDropArea(position);
            default:
                var _a = this.props, id = _a.id, dispatch = _a.dispatch;
                return split_1.default(ReactDOM.findDOMNode(this), position, id, dispatch);
        }
    };
    ItemBase.prototype.renderLeafComponent = function () {
        var _a = this.props, type = _a.type, _b = _a.state, state = _b === void 0 ? {} : _b, name = _a.name, content = _a.content, id = _a.id, other = __rest(_a, ["type", "state", "name", "content", "id"]);
        var refs = this.context.floatyContext.refs;
        var result = null;
        switch (type) {
            case 'prop-ref':
                if (name !== undefined) {
                    result = refs[name];
                }
                break;
            case 'text':
                result = content;
                break;
            default:
                throw new Error("Unknown leaf component type: " + type);
        }
        if (React.isValidElement(result)) {
            return React.cloneElement(result, __assign({}, other, { floatyId: id }, state));
        }
        else if (typeof result === 'function') {
            return result(__assign({}, other, { floatyId: id }, state));
        }
        else {
            return result;
        }
    };
    ItemBase.prototype.render = function () {
        var _this = this;
        var type = this.props.type;
        switch (type) {
            case 'column':
                return React.createElement(Column_1.default, __assign({ ref: function (r) {
                        if (r !== null) {
                            _this.item = r;
                        }
                    } }, this.props));
            case 'row':
                return React.createElement(Row_1.default, __assign({ ref: function (r) {
                        if (r !== null) {
                            _this.item = r;
                        }
                    } }, this.props));
            case 'stack':
                return React.createElement(Stack_1.default, __assign({ ref: function (r) {
                        if (r !== null) {
                            _this.item = r;
                        }
                    } }, this.props));
            default:
                return this.renderLeafComponent();
        }
    };
    ItemBase.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return ItemBase;
}(React.Component));
exports.ItemBase = ItemBase;
exports.Item = react_redux_1.connect(selectors_1.itemSelector, undefined, undefined, { withRef: true, pure: false })(ItemBase);
//# sourceMappingURL=Item.js.map
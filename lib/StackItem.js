"use strict";
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
const React = require("react");
const classnames_1 = require("classnames");
const shallowequal_1 = require("shallowequal");
const Item_1 = require("./Item");
const Types_1 = require("./Types");
class StackItem extends React.Component {
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.context, nextContext);
    }
    render() {
        const _a = this.props, { className, value } = _a, other = __rest(_a, ["className", "value"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ className: classnames_1.default(theme['floaty-stack-item'], className) }, other),
            React.createElement(Item_1.Item, { id: value }));
    }
}
StackItem.propTypes = {
    value: React.PropTypes.any.isRequired
};
StackItem.contextTypes = {
    floatyContext: Types_1.floatyContextType
};
exports.default = StackItem;
;
//# sourceMappingURL=StackItem.js.map
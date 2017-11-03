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
const ReactDOM = require("react-dom");
const shallowequal_1 = require("shallowequal");
const react_redux_1 = require("react-redux");
const Column_1 = require("./Column");
const Row_1 = require("./Row");
const Stack_1 = require("./Stack");
const selectors_1 = require("./selectors");
const Types_1 = require("./Types");
const split_1 = require("./split");
// IFloatyItemProps & IFloatyItemSelectedProps & React.Props<ItemBase> & {dispatch: Redux.Dispatch<IFloatyState>}
class ItemBase extends React.Component {
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.context, nextContext);
    }
    resolveDropArea(position) {
        const { type } = this.props;
        switch (type) {
            case 'column':
            case 'row':
            case 'stack':
                return this.item.resolveDropArea(position);
            default:
                const { id, dispatch } = this.props;
                return split_1.default(ReactDOM.findDOMNode(this), position, id, dispatch);
        }
    }
    renderLeafComponent() {
        const _a = this.props, { type, state = {}, name, content, id } = _a, other = __rest(_a, ["type", "state", "name", "content", "id"]);
        const { floatyContext: { refs } } = this.context;
        let result = null;
        switch (type) {
            case 'prop-ref':
                if (name !== undefined) {
                    result = refs[name];
                }
                break;
            case 'text':
                return React.createElement("span", null, content);
            default:
                throw new Error(`Unknown leaf component type: ${type}`);
        }
        if (React.isValidElement(result) && result.type && typeof result.type !== 'string' && result.type.prototype && result.type.prototype.isReactComponent) {
            return React.cloneElement(result, Object.assign({}, other, { floatyId: id }, state));
        }
        else if (typeof result === 'function') {
            return result(Object.assign({}, other, { floatyId: id }, state));
        }
        else {
            return result;
        }
    }
    render() {
        const { type } = this.props;
        switch (type) {
            case 'column':
                return React.createElement(Column_1.default, Object.assign({ ref: r => {
                        if (r !== null) {
                            this.item = r;
                        }
                    } }, this.props));
            case 'row':
                return React.createElement(Row_1.default, Object.assign({ ref: r => {
                        if (r !== null) {
                            this.item = r;
                        }
                    } }, this.props));
            case 'stack':
                return React.createElement(Stack_1.default, Object.assign({ ref: r => {
                        if (r !== null) {
                            this.item = r;
                        }
                    } }, this.props));
            default:
                return this.renderLeafComponent();
        }
    }
}
ItemBase.contextTypes = {
    floatyContext: Types_1.floatyContextType
};
exports.ItemBase = ItemBase;
exports.Item = react_redux_1.connect(selectors_1.itemSelector, undefined, undefined, { withRef: true, pure: false })(ItemBase);
//# sourceMappingURL=Item.js.map
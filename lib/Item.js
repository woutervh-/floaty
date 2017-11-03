var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import shallowEqual from 'shallowequal';
import { connect } from 'react-redux';
import Column from './Column';
import Row from './Row';
import Stack from './Stack';
import { itemSelector } from './selectors';
import { floatyContextType } from './Types';
import split from './split';
// IFloatyItemProps & IFloatyItemSelectedProps & React.Props<ItemBase> & {dispatch: Redux.Dispatch<IFloatyState>}
export class ItemBase extends React.Component {
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
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
                return split(ReactDOM.findDOMNode(this), position, id, dispatch);
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
                return React.createElement(Column, Object.assign({ ref: r => {
                        if (r !== null) {
                            this.item = r;
                        }
                    } }, this.props));
            case 'row':
                return React.createElement(Row, Object.assign({ ref: r => {
                        if (r !== null) {
                            this.item = r;
                        }
                    } }, this.props));
            case 'stack':
                return React.createElement(Stack, Object.assign({ ref: r => {
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
    floatyContext: floatyContextType
};
export const Item = connect(itemSelector, undefined, undefined, { withRef: true, pure: false })(ItemBase);
//# sourceMappingURL=Item.js.map
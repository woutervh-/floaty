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
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import { Item } from './Item';
import { floatyContextType } from './Types';
export default class StackItem extends React.Component {
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }
    render() {
        const _a = this.props, { className, value } = _a, other = __rest(_a, ["className", "value"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ className: classNames(theme['floaty-stack-item'], className) }, other),
            React.createElement(Item, { id: value }));
    }
}
StackItem.propTypes = {
    value: React.PropTypes.any.isRequired
};
StackItem.contextTypes = {
    floatyContext: floatyContextType
};
;
//# sourceMappingURL=StackItem.js.map
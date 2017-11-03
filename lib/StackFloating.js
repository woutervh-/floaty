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
import { floatyContextType } from './Types';
import StackItem from './StackItem';
import { Item } from './Item';
export default class StackFloating extends React.Component {
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }
    renderHeaderTab() {
        const { title } = this.props;
        const { floatyContext: { theme } } = this.context;
        return React.createElement("li", { className: classNames(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active']) },
            React.createElement(Item, { id: title }));
    }
    renderHeaderTabs() {
        const { floatyContext: { theme } } = this.context;
        return React.createElement("ul", { className: theme['floaty-stack-header-tabs'] }, this.renderHeaderTab());
    }
    renderHeader() {
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", { className: theme['floaty-stack-header'] }, this.renderHeaderTabs());
    }
    render() {
        const _a = this.props, { className, title, item, style, x, y } = _a, other = __rest(_a, ["className", "title", "item", "style", "x", "y"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ className: classNames(theme['floaty-stack'], theme['floaty-stack-floating'], className), style: Object.assign({}, style, { top: y, left: x }) }, other),
            this.renderHeader(),
            React.createElement(StackItem, { value: item }));
    }
}
StackFloating.contextTypes = {
    floatyContext: floatyContextType
};
;
//# sourceMappingURL=StackFloating.js.map
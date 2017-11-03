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
const classnames_1 = require("classnames");
const Draggable_1 = require("./Draggable");
const DomUtil = require("./DomUtil");
const shallowequal_1 = require("shallowequal");
const actions_1 = require("./actions");
const StackItem_1 = require("./StackItem");
const Types_1 = require("./Types");
const split_1 = require("./split");
const Item_1 = require("./Item");
class Stack extends React.Component {
    constructor() {
        super(...arguments);
        this.tabs = {};
        this.unmakeDraggablesTimeout = null;
        this.draggables = [];
    }
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.context, nextContext);
    }
    componentDidMount() {
        this.makeDraggables();
    }
    componentWillUpdate() {
        this.unmakeDraggables();
    }
    componentDidUpdate() {
        this.unmakeDraggables(() => this.makeDraggables());
    }
    componentWillUnmount() {
        this.unmakeDraggables();
    }
    makeDraggables() {
        const { items } = this.props;
        for (let i = 0; i < items.length; i++) {
            const draggable = Draggable_1.default(ReactDOM.findDOMNode(this.tabs['tab-' + i]), 5);
            draggable.on('dragstart', () => this.handleDragStart(i));
            this.draggables.push(draggable);
        }
    }
    unmakeDraggables(callback = () => undefined) {
        const unmakeDraggablesTimeout = this.unmakeDraggablesTimeout;
        if (unmakeDraggablesTimeout !== null) {
            window.clearTimeout(unmakeDraggablesTimeout);
        }
        if (this.draggables.length === 0) {
            this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
        }
        else {
            let destroyedCount = 0;
            this.draggables.forEach(draggable => draggable.on('destroyed', () => {
                if (++destroyedCount == this.draggables.length) {
                    this.draggables = [];
                    this.tabs = {};
                    this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
                }
            }));
            this.draggables.forEach(draggable => draggable.emit('destroy'));
        }
    }
    handleDragStart(index) {
        const { id, dispatch, items, titles } = this.props;
        const { floatyContext: { float } } = this.context;
        this.draggables.splice(index, 1)[0].emit('destroy');
        float(items[index], titles[index]);
        dispatch(actions_1.removeTab(id, index));
    }
    handleTabClick(index) {
        const { id, dispatch } = this.props;
        dispatch(actions_1.setActiveTab(id, index));
    }
    resolveDropArea(position) {
        const headerElement = this.header;
        const headerBox = DomUtil.elementOffset(headerElement);
        if (DomUtil.isWithinBox(position, headerBox)) {
            const { dispatch, id, items } = this.props;
            for (let i = 0; i < items.length; i++) {
                const tabElement = this.tabs['tab-' + i];
                const tabBox = DomUtil.elementOffset(tabElement);
                if (DomUtil.isWithinBox(position, tabBox)) {
                    return {
                        x: tabBox.x,
                        y: tabBox.y,
                        width: tabBox.width,
                        height: tabBox.height,
                        execute: (item, title) => dispatch(actions_1.insertTab(id, i, item, title)),
                        resolved: true
                    };
                }
            }
            return {
                x: headerBox.x,
                y: headerBox.y,
                width: headerBox.width,
                height: headerBox.height,
                execute: (item, title) => dispatch(actions_1.insertTab(id, items.length, item, title)),
                resolved: true
            };
        }
        else {
            const containerElement = this.container;
            const containerBox = DomUtil.elementOffset(containerElement);
            if (DomUtil.isWithinBox(position, containerBox)) {
                const { dispatch, id } = this.props;
                return split_1.default(containerElement, position, id, dispatch);
            }
            else {
                return { x: 0, y: 0, width: 0, height: 0, resolved: false };
            }
        }
    }
    renderTabs() {
        const { id, active, titles } = this.props;
        const { floatyContext: { theme } } = this.context;
        return React.createElement("ul", { className: theme['floaty-stack-header-tabs'] }, titles.map((title, index) => React.createElement("li", { key: index, ref: (r) => {
                if (r !== null) {
                    this.tabs['tab-' + index] = r;
                }
            }, className: classnames_1.default(theme['floaty-stack-header-tabs-item'], { [theme['floaty-stack-header-tabs-item-active']]: index === active }), onClick: () => this.handleTabClick(index) },
            React.createElement(Item_1.Item, { id: title, floatyStackId: id, floatyStackIndex: index }))));
    }
    renderHeader() {
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", { ref: (r) => {
                if (r !== null) {
                    this.header = r;
                }
            }, className: theme['floaty-stack-header'] }, this.renderTabs());
    }
    render() {
        const _a = this.props, { active, items, className, id, dispatch, titles, type } = _a, other = __rest(_a, ["active", "items", "className", "id", "dispatch", "titles", "type"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ ref: r => {
                if (r !== null) {
                    this.container = r;
                }
            }, className: classnames_1.default(theme['floaty-stack'], className) }, other),
            this.renderHeader(),
            0 <= active && active < items.length && React.createElement(StackItem_1.default, { value: items[active] }));
    }
}
Stack.defaultProps = {
    active: 0
};
Stack.contextTypes = {
    floatyContext: Types_1.floatyContextType
};
exports.default = Stack;
;
//# sourceMappingURL=Stack.js.map
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
const RowSeparator_1 = require("./RowSeparator");
const RowItem_1 = require("./RowItem");
const DomUtil = require("./DomUtil");
const shallowequal_1 = require("shallowequal");
const actions_1 = require("./actions");
const Types_1 = require("./Types");
class Row extends React.Component {
    constructor() {
        super(...arguments);
        this.items = {};
    }
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.context, nextContext);
    }
    getWidthForRowItem(index) {
        const rowItem = ReactDOM.findDOMNode(this.items['row-item-' + index]);
        return parseFloat(window.getComputedStyle(rowItem)['width'] || '0');
    }
    getBoundsForSeparator(index) {
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        return { min: -widthA, max: widthB };
    }
    renderRowItems() {
        const { items, growValues = [] } = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(React.createElement(RowSeparator_1.RowSeparator, { key: 2 * i - 1, getBounds: () => this.getBoundsForSeparator(i - 1), onPositionChange: offset => this.handlePositionChange(i - 1, offset) }));
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = React.createElement(RowItem_1.default, { key: 2 * i, ref: (r) => {
                    if (r === null) {
                        delete this.items['row-item-' + i];
                    }
                    else {
                        this.items['row-item-' + i] = r;
                    }
                }, value: items[i], style: { flexGrow: growValue } });
            result.push(element);
        }
        return result;
    }
    handlePositionChange(index, offset) {
        const { id, dispatch, growValues = [] } = this.props;
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        const widthSum = widthA + widthB;
        const growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        const fraction = (widthA + offset) / widthSum;
        const newGrowValues = growValues.slice();
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(actions_1.setGrowValues(id, newGrowValues));
    }
    resolveDropArea(position) {
        const { items } = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this.items['row-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.items['row-item-' + i].resolveDropArea(position);
            }
        }
        return { x: 0, y: 0, width: 0, height: 0, resolved: false };
    }
    render() {
        const _a = this.props, { className, dispatch, id, growValues, items, type } = _a, other = __rest(_a, ["className", "dispatch", "id", "growValues", "items", "type"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ className: classnames_1.default(theme['floaty-row'], className) }, other), this.renderRowItems());
    }
}
Row.contextTypes = {
    floatyContext: Types_1.floatyContextType
};
exports.default = Row;
;
//# sourceMappingURL=Row.js.map
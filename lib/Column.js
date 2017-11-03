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
import classNames from 'classnames';
import { ColumnSeparator } from './ColumnSeparator';
import ColumnItem from './ColumnItem';
import * as DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import { setGrowValues } from './actions';
import { floatyContextType } from './Types';
export default class Column extends React.Component {
    constructor() {
        super(...arguments);
        this.items = {};
    }
    shouldComponentUpdate(nextProps, _, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }
    getHeightForColumnItem(index) {
        const columnItem = ReactDOM.findDOMNode(this.items['column-item-' + index]);
        return parseFloat(window.getComputedStyle(columnItem)['height'] || '0');
    }
    getBoundsForSeparator(index) {
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        return { min: -heightA, max: heightB };
    }
    renderColumnItems() {
        const { items, growValues = [] } = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(React.createElement(ColumnSeparator, { key: 2 * i - 1, getBounds: () => this.getBoundsForSeparator(i - 1), onPositionChange: offset => this.handlePositionChange(i - 1, offset) }));
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = React.createElement(ColumnItem, { key: 2 * i, ref: (r) => {
                    if (r === null) {
                        delete this.items['column-item-' + i];
                    }
                    else {
                        this.items['column-item-' + i] = r;
                    }
                }, value: items[i], style: { flexGrow: growValue } });
            result.push(element);
        }
        return result;
    }
    handlePositionChange(index, offset) {
        const { id, dispatch, growValues = [] } = this.props;
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        const heightSum = heightA + heightB;
        const growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        const fraction = (heightA + offset) / heightSum;
        const newGrowValues = growValues.slice();
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(setGrowValues(id, newGrowValues));
    }
    resolveDropArea(position) {
        const { items } = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this.items['column-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.items['column-item-' + i].resolveDropArea(position);
            }
        }
        return { x: 0, y: 0, width: 0, height: 0, resolved: false };
    }
    render() {
        const _a = this.props, { className, dispatch, id, growValues, items, type } = _a, other = __rest(_a, ["className", "dispatch", "id", "growValues", "items", "type"]);
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", Object.assign({ className: classNames(theme['floaty-column'], className) }, other), this.renderColumnItems());
    }
}
Column.contextTypes = {
    floatyContext: floatyContextType
};
;
//# sourceMappingURL=Column.js.map
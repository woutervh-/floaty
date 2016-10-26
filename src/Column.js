import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ColumnSeparator from './ColumnSeparator';
import ColumnItem from './ColumnItem';
import * as DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {setGrowValues} from './actions';
import {floatyContextType} from './Types';

export default class Column extends React.Component {
    static propTypes = {
        growValues: React.PropTypes.array,
        items: React.PropTypes.array.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    getHeightForColumnItem(index) {
        const columnItem = ReactDOM.findDOMNode(this['column-item-' + index]);
        return parseFloat(window.getComputedStyle(columnItem)['height']);
    }

    getBoundsForSeparator(index) {
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        return {min: -heightA, max: heightB};
    }

    renderColumnItems() {
        const {items, growValues = []} = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(<ColumnSeparator key={2 * i - 1} getBounds={() => this.getBoundsForSeparator(i - 1)} onPositionChange={offset => this.handlePositionChange(i - 1, offset)}/>);
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = <ColumnItem key={2 * i} ref={r => this['column-item-' + i] = r} value={items[i]} style={{flexGrow: growValue}}/>;
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index, offset) {
        const {id, dispatch, growValues = []} = this.props;
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        const heightSum = heightA + heightB;
        const growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        const fraction = (heightA + offset) / heightSum;
        const newGrowValues = [...growValues];
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(setGrowValues(id, newGrowValues));
    }

    resolveDropArea(position) {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this['column-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this['column-item-' + i].resolveDropArea(position);
            }
        }
        return {x: 0, y: 0, width: 0, height: 0, resolved: false};
    }

    render() {
        const {className, dispatch, id, growValues, items, type, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-column'], className)} {...other}>
            {this.renderColumnItems()}
        </div>;
    }
};

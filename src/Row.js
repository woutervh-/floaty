import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import RowSeparator from './RowSeparator';
import RowItem from './RowItem';
import * as DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {setGrowValues} from './actions';
import {floatyContextType} from './Types';

export default class Row extends React.Component {
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

    getWidthForRowItem(index) {
        const rowItem = ReactDOM.findDOMNode(this['row-item-' + index]);
        return parseFloat(window.getComputedStyle(rowItem)['width']);
    }

    getBoundsForSeparator(index) {
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        return {min: -widthA, max: widthB};
    }

    renderRowItems() {
        const {items, growValues = []} = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(<RowSeparator key={2 * i - 1} getBounds={() => this.getBoundsForSeparator(i - 1)} onPositionChange={offset => this.handlePositionChange(i - 1, offset)}/>);
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = <RowItem key={2 * i} ref={r => this['row-item-' + i] = r} value={items[i]} style={{flexGrow: growValue}}/>;
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index, offset) {
        const {id, dispatch, growValues = []} = this.props;
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        const widthSum = widthA + widthB;
        const growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        const fraction = (widthA + offset) / widthSum;
        const newGrowValues = [...growValues];
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(setGrowValues(id, newGrowValues));
    }

    resolveDropArea(position) {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this['row-item-' + i]);
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this['row-item-' + i].resolveDropArea(position);
            }
        }
        return {x: 0, y: 0, width: 0, height: 0, resolved: false};
    }

    render() {
        const {className, dispatch, id, growValues, items, type, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-row'], className)} {...other}>
            {this.renderRowItems()}
        </div>;
    }
}

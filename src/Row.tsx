import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as classNames from 'classnames';
import * as Redux from 'redux';
import {RowSeparator} from './RowSeparator';
import RowItem from './RowItem';
import * as DomUtil from './DomUtil';
import shallowEqual = require('shallowequal');
import {setGrowValues} from './actions';
import {floatyContextType, IFloatyContext} from './Types';
import {IFloatyState} from './reducers/index';
import {IResolvableDropArea, IDropAreaResolution} from './DropAreaTypes';

export interface RowProps extends React.AllHTMLAttributes<HTMLDivElement> {
    id: string;
    dispatch: Redux.Dispatch<IFloatyState>;
    growValues: Array<number>;
    items: Array<any>;
}

export default class Row extends React.Component<RowProps, never> implements IResolvableDropArea {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    items: {[key: string]: RowItem} = {};

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    getWidthForRowItem(index: number) {
        const rowItem = ReactDOM.findDOMNode(this.items['row-item-' + index] as any);
        return parseFloat(window.getComputedStyle(rowItem)['width'] || '0');
    }

    getBoundsForSeparator(index: number) {
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        return {min: -widthA, max: widthB};
    }

    renderRowItems(): Array<React.ReactElement<RowItem> | React.ReactElement<RowSeparator>> {
        const {items, growValues = []} = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i: number = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(<RowSeparator key={2 * i - 1} getBounds={() => this.getBoundsForSeparator(i - 1)} onPositionChange={offset => this.handlePositionChange(i - 1, offset)}/>);
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = <RowItem key={2 * i} ref={(r: RowItem | null) => {
                if (r === null) {
                    delete this.items['row-item-' + i];
                } else {
                    this.items['row-item-' + i] = r;
                }
            }} value={items[i]} style={{flexGrow: growValue}}/>;
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index: number, offset: number) {
        const {id, dispatch, growValues = []} = this.props;
        const widthA = this.getWidthForRowItem(index);
        const widthB = this.getWidthForRowItem(index + 1);
        const widthSum = widthA + widthB;
        const growValuesSum = (growValues[index] || 1) + (growValues[index + 1] || 1);
        const fraction = (widthA + offset) / widthSum;
        const newGrowValues = growValues.slice();
        newGrowValues[index] = fraction * growValuesSum;
        newGrowValues[index + 1] = (1 - fraction) * growValuesSum;
        dispatch(setGrowValues(id, newGrowValues));
    }

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this.items['row-item-' + i]) as HTMLElement;
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.items['row-item-' + i].resolveDropArea(position);
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
};

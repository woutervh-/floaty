import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames = require('classnames');
import * as Redux from 'redux';
import {ColumnSeparator} from './ColumnSeparator';
import ColumnItem from './ColumnItem';
import * as DomUtil from './DomUtil';
import shallowEqual = require('shallowequal');
import {setGrowValues} from './actions';
import {floatyContextType, IFloatyContext} from './Types';
import {IFloatyState} from './reducers/index';
import {IResolvableDropArea, IDropAreaResolution} from './DropAreaTypes';

export default class Column extends React.Component<{id: string, dispatch: Redux.Dispatch<IFloatyState>, growValues: Array<number>, items: Array<any>} & React.AllHTMLAttributes<HTMLDivElement>, any> implements IResolvableDropArea {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    items: {[key: string]: ColumnItem} = {};

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    getHeightForColumnItem(index: number) {
        const columnItem = ReactDOM.findDOMNode(this.items['column-item-' + index] as any);
        return parseFloat(window.getComputedStyle(columnItem)['height'] || '0');
    }

    getBoundsForSeparator(index: number) {
        const heightA = this.getHeightForColumnItem(index);
        const heightB = this.getHeightForColumnItem(index + 1);
        return {min: -heightA, max: heightB};
    }

    renderColumnItems(): Array<React.ReactElement<ColumnItem> | React.ReactElement<ColumnSeparator>> {
        const {items, growValues = []} = this.props;
        const result = [];
        let growValuesSum = 0;
        for (let i = 0; i < items.length; i++) {
            growValuesSum += growValues[i] || 1;
        }
        for (let i: number = 0; i < items.length; i++) {
            if (i > 0) {
                result.push(<ColumnSeparator key={2 * i - 1} getBounds={() => this.getBoundsForSeparator(i - 1)} onPositionChange={offset => this.handlePositionChange(i - 1, offset)}/>);
            }
            const growValue = (growValues[i] || 1) / growValuesSum;
            const element = <ColumnItem key={2 * i} ref={(r: ColumnItem | null) => {
                if (r === null) {
                    delete this.items['column-item-' + i];
                } else {
                    this.items['column-item-' + i] = r;
                }
            }} value={items[i]} style={{flexGrow: growValue}}/>;
            result.push(element);
        }
        return result;
    }

    handlePositionChange(index: number, offset: number) {
        const {id, dispatch, growValues = []} = this.props;
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

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const element = ReactDOM.findDOMNode(this.items['column-item-' + i]) as HTMLElement;
            const box = DomUtil.elementOffset(element);
            if (DomUtil.isWithinBox(position, box)) {
                return this.items['column-item-' + i].resolveDropArea(position);
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

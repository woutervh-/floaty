import * as React from 'react';
import classNames = require('classnames');
import shallowEqual = require('shallowequal');
import {Item, ItemBase} from './Item';
import {floatyContextType, IFloatyContext} from './Types';
import {IResolvableDropArea, IDropAreaResolution} from './DropAreaTypes';

export default class ColumnItem extends React.Component<{value: any} & React.AllHTMLAttributes<HTMLDivElement>, any> implements IResolvableDropArea {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    item: ItemBase;

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        const {value} = this.props;
        return this.item.resolveDropArea(position);
    }

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-column-item'], className)} {...other}>
            <Item ref={(r: any) => {
                if (r !== null) {
                    this.item = (r as {[key: string]: any})['wrappedInstance'] as ItemBase;
                }
            }} id={value}/>
        </div>;
    }
};

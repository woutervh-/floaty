import * as React from 'react';
import classNames = require('classnames');
import shallowEqual = require('shallowequal');
import {floatyContextType, IFloatyContext} from './Types';
import StackItem from './StackItem';
import {Item} from './Item';

export interface IFloatyStackFloatingProps {
    title: any;
    item: any;
    x: number;
    y: number;
}

export default class StackFloating extends React.Component<IFloatyStackFloatingProps & React.AllHTMLAttributes<HTMLDivElement>, any> {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    renderHeaderTab() {
        const {title} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <li className={classNames(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active'])}>
            <Item id={title}/>
        </li>;
    }

    renderHeaderTabs() {
        const {floatyContext: {theme}} = this.context;

        return <ul className={theme['floaty-stack-header-tabs']}>
            {this.renderHeaderTab()}
        </ul>;
    }

    renderHeader() {
        const {floatyContext: {theme}} = this.context;

        return <div className={theme['floaty-stack-header']}>
            {this.renderHeaderTabs()}
        </div>;
    }

    render() {
        const {className, title, item, style, x, y, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-stack'], theme['floaty-stack-floating'], className)} style={{...style, top: y, left: x}} {...other}>
            {this.renderHeader()}
            <StackItem value={item}/>
        </div>;
    }
};

import * as React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {Item} from './Item';
import {floatyContextType} from './Types';

export interface IFloatyStackItemProps {
    value: any;
}

export default class StackItem extends React.Component<IFloatyStackItemProps & React.AllHTMLAttributes<HTMLDivElement>, any> {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-stack-item'], className)} {...other}>
            <Item id={value}/>
        </div>;
    }
};

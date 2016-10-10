import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Item from './Item';
import {floatyContextType} from './Types';

export default class StackItem extends React.Component {
    static propTypes = {
        value: React.PropTypes.any.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-stack-item'], className)} {...other}>
            {typeof value === 'number' ? <Item id={value}/> : value}
        </div>;
    }
};

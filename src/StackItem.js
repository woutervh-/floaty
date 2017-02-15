import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Item from './Item';
import {floatyContextType} from './Types';
import {isIdentifier} from './identifiers';

export default class StackItem extends React.Component {
    static propTypes = {
        value: React.PropTypes.any.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-stack-item'], className)} {...other}>
            {isIdentifier(value) ? <Item id={value}/> : value}
        </div>;
    }
};

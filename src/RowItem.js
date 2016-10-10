import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Item from './Item';
import {floatyContextType} from './Types';
import split from './split';

export default class RowItem extends React.Component {
    static propTypes = {
        value: React.PropTypes.any.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    resolveDropArea(position) {
        const {value} = this.props;
        if (typeof value === 'number') {
            return this.item.getWrappedInstance().resolveDropArea(position);
        } else {
            return split(ReactDOM.findDOMNode(this), position);
        }
    }

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-row-item'], className)} {...other}>
            {typeof value === 'number' ? <Item ref={r => this.item = r} id={value}/> : value}
        </div>;
    }
};

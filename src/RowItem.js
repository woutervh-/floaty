import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Item from './Item';
import {floatyContextType} from './Types';
import split from './split';
import {isIdentifier} from './identifiers';

export default class RowItem extends React.Component {
    static propTypes = {
        value: React.PropTypes.any.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    resolveDropArea(position) {
        const {value} = this.props;
        if (isIdentifier(value)) {
            return this.item.getWrappedInstance().resolveDropArea(position);
        } else {
            return split(ReactDOM.findDOMNode(this), position);
        }
    }

    render() {
        const {className, value, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-row-item'], className)} {...other}>
            {isIdentifier(value) ? <Item ref={r => this.item = r} id={value}/> : value}
        </div>;
    }
};

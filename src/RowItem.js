import React from 'react';
import SplittablePanel from './SplittablePanel';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export default class RowItem extends SplittablePanel {
    static propTypes = {
        id: React.PropTypes.number.isRequired
    };

    static contextTypes = {
        floatyContext: React.PropTypes.shape({
            refs: React.PropTypes.object.isRequired,
            theme: React.PropTypes.object.isRequired
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    render() {
        const {theme} = this.context;
        const {className, id, ...other} = this.props;

        return <div ref="container" className={classNames(theme['floaty-row-item'], className)} {...other}>
            <Item id={id}/>
        </div>;
    }
};

import React from 'react';
import GenericContent from './GenericContent';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {updateGeneric} from './actions';

export default class StackItem extends GenericContent {
    static propTypes = {
        dispatch: React.PropTypes.func.isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    dispatch(action) {
        this.props.dispatch(updateGeneric(action));
    }

    render() {
        const {theme} = this.context;
        const {children, className, dispatch, ...other} = this.props;

        return <div ref="container" className={classNames(theme['floaty-stack-item'], className)} {...other}>
            {this.transformChildren()}
        </div>;
    }
};

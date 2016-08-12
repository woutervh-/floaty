import React from 'react';
import classNames from 'classnames';

export default class StackItem extends React.Component {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    static propTypes = {
        title: React.PropTypes.any.isRequired
    };

    render() {
        const {theme} = this.context;
        const {children, className, ...other} = this.props;

        return <div className={classNames(theme['floaty-stack-item'], className)} {...other}>
            {children}
        </div>;
    }
};

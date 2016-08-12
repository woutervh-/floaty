import React from 'react';
import classNames from 'classnames';

export default class RowItem extends React.Component {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    render() {
        const {theme} = this.context;
        const {children, className, ...other} = this.props;

        return <div className={classNames(theme['floaty-row-item'], className)} {...other}>
            {children}
        </div>;
    }
};

import React from 'react';
import GenericContent from './GenericContent';
import classNames from 'classnames';

export default class RowItem extends GenericContent {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };
    
    render() {
        const {theme} = this.context;
        const {children, className, ...other} = this.props;

        return <div ref="container" className={classNames(theme['floaty-row-item'], className)} {...other}>
            {this.transformChildren()}
        </div>;
    }
};

import React from 'react';
import classNames from 'classnames';

export default class StackFloating extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    render() {
        const {children, className, name, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-stack'], className)} {...other}>
            <div ref="header" className={theme['floaty-stack-header']}>
                <ul className={theme['floaty-stack-header-tabs']}>
                        <li className={classNames(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active'])}>
                            {name}
                        </li>
                </ul>
            </div>
            {children}
        </div>;
    }
};

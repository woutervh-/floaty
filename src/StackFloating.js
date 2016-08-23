import React from 'react';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';

export default class StackFloating extends React.Component {
    static propTypes = {
        title: React.PropTypes.string.isRequired,
        x: React.PropTypes.number.isRequired,
        y: React.PropTypes.number.isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    render() {
        const {children, className, title, style, x, y, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-stack'], theme['floaty-stack-floating'], className)} style={{...style, top: y, left: x}} {...other}>
            <div ref="header" className={theme['floaty-stack-header']}>
                <ul className={theme['floaty-stack-header-tabs']}>
                    <li className={classNames(theme['floaty-stack-header-tabs-item'], theme['floaty-stack-header-tabs-item-active'])}>
                        {title}
                    </li>
                </ul>
            </div>
            {children}
        </div>;
    }
};

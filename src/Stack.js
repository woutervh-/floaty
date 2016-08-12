import React from 'react';
import classNames from 'classnames';

export default class Stack extends React.Component {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    state = {
        active: 0
    };

    handleTabClick(index) {
        this.setState({active: index});
    }

    renderActiveChild() {
        const {children} = this.props;
        return React.Children.toArray(children)[this.state.active];
    }

    render() {
        const {theme} = this.context;
        const {children, className, ...other} = this.props;

        return <div className={classNames(theme['floaty-stack'], className)} {...other}>
            <div className={theme['floaty-stack-header']}>
                <ul className={theme['floaty-stack-header-tabs']}>
                    {React.Children.map(this.props.children, (child, index) =>
                        <li className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index == this.state.active})} onClick={this.handleTabClick.bind(this, index)}>
                            {child.props.title}
                        </li>
                    )}
                </ul>
            </div>
            {this.renderActiveChild()}
        </div>;
    }
};

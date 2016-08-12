import React from 'react';

export default class ThemeProvider extends React.Component {
    static propTypes = {
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    getChildContext() {
        return {theme: this.props.theme};
    }

    render() {
        return React.Children.only(this.props.children);
    }
};

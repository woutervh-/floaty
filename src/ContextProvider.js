import React from 'react';

export default class ContextProvider extends React.Component {
    static propTypes = {
        dispatcher: React.PropTypes.object.isRequired,
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        dispatcher: React.PropTypes.object.isRequired,
        theme: React.PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            dispatcher: this.props.dispatcher,
            theme: this.props.theme
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
};

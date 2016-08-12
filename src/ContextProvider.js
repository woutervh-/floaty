import React from 'react';
import EventBus from './EventBus';

export default class ThemeProvider extends React.Component {
    constructor() {
        super();
        this.eventBusInstance = new EventBus();
    }

    static propTypes = {
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired,
        eventBus: React.PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            theme: this.props.theme,
            eventBus: this.eventBusInstance
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
};

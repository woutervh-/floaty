import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Draggable from './Draggable';

export default class RowSeparator extends React.Component {
    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    static propTypes = {
        onPositionChange: React.PropTypes.func.isRequired
    };

    state = {
        offset: 0
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.offset != nextState.offset;
    }

    componentDidMount() {
        this.draggable = Draggable(ReactDOM.findDOMNode(this));
        this.draggable.on('dragstart', this.handleDragStart.bind(this));
        this.draggable.on('drag', this.handleDrag.bind(this));
        this.draggable.on('dragstop', this.handleDragStop.bind(this));
    }

    componentWillUnmount() {
        this.draggable.emit('destroy');
    }

    handleDragStart() {
        const {theme} = this.context;
        document.body.classList.add(theme['floaty-unselectable']);
    }

    handleDrag(event) {
        this.setState({offset: event.x});
    }

    handleDragStop() {
        const {theme} = this.context;
        document.body.classList.remove(theme['floaty-unselectable']);
        this.props.onPositionChange(this.state.offset);
        this.setState({offset: 0});
    }

    render() {
        const {offset} = this.state;
        const {className, onPositionChange} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-row-separator'], className)} style={{left: offset}}/>;
    }
};

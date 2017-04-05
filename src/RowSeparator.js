import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Draggable from './Draggable';
import {floatyContextType} from './Types';

export default class RowSeparator extends React.Component {
    static propTypes = {
        getBounds: React.PropTypes.func.isRequired,
        onPositionChange: React.PropTypes.func.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    state = {
        offset: 0
    };

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context, nextContent);
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

    clampOffset(offset) {
        const {min, max} = this.props.getBounds();
        return Math.min(max, Math.max(min, offset));
    }

    handleDragStart() {
        const {floatyContext: {theme}} = this.context;
        document.body.classList.add(theme['floaty-unselectable']);
    }

    handleDrag(event) {
        event.originalEvent.stopPropagation();
        event.originalEvent.preventDefault();
        this.setState({offset: this.clampOffset(event.dx)});
    }

    handleDragStop() {
        const {floatyContext: {theme}} = this.context;
        document.body.classList.remove(theme['floaty-unselectable']);
        this.props.onPositionChange(this.state.offset);
        this.setState({offset: 0});
    }

    render() {
        const {offset} = this.state;
        const {className, onPositionChange} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-row-separator'], className)} style={{left: offset}}/>;
    }
};

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {EventEmitter} from 'eventemitter3';
import Draggable from './Draggable';
import {floatyContextType, IFloatyContext} from './Types';
import {IDraggableEventWithDelta} from './Draggable';

export interface RowSeparatorProps {
    className?: string;
    getBounds: () => {min: number, max: number};
    onPositionChange: (offset: number) => void;
}

export interface RowSeparatorState {
    offset: number;
}

export class RowSeparator extends React.Component<RowSeparatorProps, RowSeparatorState> {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    state = {
        offset: 0
    };

    draggable: EventEmitter;

    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context, nextContext);
    }

    componentDidMount() {
        this.draggable = Draggable(ReactDOM.findDOMNode(this));
        this.draggable.on('dragstart', () => this.handleDragStart());
        this.draggable.on('drag', (event: IDraggableEventWithDelta) => this.handleDrag(event));
        this.draggable.on('dragstop', () => this.handleDragStop());
    }

    componentWillUnmount() {
        this.draggable.emit('destroy');
    }

    clampOffset(offset: number) {
        const {min, max} = this.props.getBounds();
        return Math.min(max, Math.max(min, offset));
    }

    handleDragStart() {
        const {floatyContext: {theme}} = this.context;
        document.body.classList.add(theme['floaty-unselectable']);
    }

    handleDrag(event: IDraggableEventWithDelta) {
        this.setState({offset: this.clampOffset(event.dx)});
    }

    handleDragStop() {
        const {floatyContext: {theme}} = this.context;
        document.body.classList.remove(theme['floaty-unselectable']);
        this.props.onPositionChange(this.state.offset);
        this.setState({offset: 0});
    }

    render() {
        const {className, onPositionChange} = this.props;
        const {offset} = this.state;
        const {floatyContext: {theme}} = this.context;

        return <div className={classNames(theme['floaty-row-separator'], className)} style={{left: offset}}/>;
    }
}

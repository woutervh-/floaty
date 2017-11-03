import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import {EventEmitter} from 'eventemitter3';
import Draggable from './Draggable';
import {floatyContextType, IFloatyContext} from './Types';
import {IDraggableEventWithDelta} from './Draggable';

export interface IColumnSeparatorProps {
    getBounds: () => {min: number, max: number};
    onPositionChange: (offset: number) => void;
}

export interface IColumnSeparatorState {
    offset: number;
}

export class ColumnSeparator extends React.Component<IColumnSeparatorProps & React.HTMLProps<ColumnSeparator>, IColumnSeparatorState> {
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
        this.setState({offset: this.clampOffset(event.dy)});
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

        return <div className={classNames(theme['floaty-column-separator'], className)} style={{top: offset}}/>;
    }
}

import * as React from 'react';
import { Draggable, DragInformation } from 'react-managed-draggable';
import * as RenderersModel from '../renderers-model';

interface State {
    dragging: DragInformation | null;
}

export class RowSeparatorRenderer extends React.PureComponent<RenderersModel.RowSeparatorRendererProps, State> {
    public state: State = {
        dragging: null
    };

    public render() {
        let left = 0;
        if (this.state.dragging) {
            left = this.state.dragging.current.x - this.state.dragging.start.x;
        }

        return <Draggable
            style={{ position: 'relative' }}
            onDragStart={this.handleDragStart}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleDragEnd}
        >
            <div style={{ backgroundColor: 'black', position: 'absolute', cursor: 'pointer', top: 0, left, width: '100%', height: '100%' }} />
        </Draggable>;
    }

    private handleDragStart = (event: MouseEvent | TouchEvent, dragInformation: DragInformation) => {
        this.setState({ dragging: dragInformation });
    }

    private handleDragMove = (event: MouseEvent | TouchEvent, dragInformation: DragInformation) => {
        this.setState({ dragging: dragInformation });
    }

    private handleDragEnd = (event: MouseEvent | TouchEvent | undefined, dragInformation: DragInformation) => {
        this.setState({ dragging: null });
        this.props.onMove(this.props.index, dragInformation.current.x - dragInformation.start.x);
    }
}

import * as React from 'react';
import { Draggable, DragInformation } from 'react-managed-draggable';
import * as RenderersModel from '../renderers-model';

interface State {
    deltaX: number | null;
}

export class RowSeparatorRenderer extends React.PureComponent<RenderersModel.RowSeparatorRendererProps, State> {
    public state: State = {
        deltaX: null
    };

    public render() {
        let left = 0;
        if (this.state.deltaX !== null) {
            left = this.state.deltaX;
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
        const deltaX = this.props.clamp(this.props.index, dragInformation.current.x - dragInformation.start.x);
        this.setState({ deltaX });
    }

    private handleDragMove = (event: MouseEvent | TouchEvent, dragInformation: DragInformation) => {
        const deltaX = this.props.clamp(this.props.index, dragInformation.current.x - dragInformation.start.x);
        this.setState({ deltaX });
    }

    private handleDragEnd = (event: MouseEvent | TouchEvent | undefined, dragInformation: DragInformation) => {
        this.setState({ deltaX: null });
        const deltaX = this.props.clamp(this.props.index, dragInformation.current.x - dragInformation.start.x);
        this.props.onMove(this.props.index, deltaX);
    }
}

import * as React from 'react';
import { Draggable, DragInformation } from 'react-managed-draggable';
import * as RenderersModel from '../renderers-model';

interface State {
    deltaY: number | null;
}

export class ColumnSeparatorRenderer extends React.PureComponent<RenderersModel.ColumnSeparatorRendererProps, State> {
    public state: State = {
        deltaY: null
    };

    public render() {
        let top = 0;
        if (this.state.deltaY !== null) {
            top = this.state.deltaY;
        }

        return <Draggable
            style={{ position: 'relative' }}
            onDragStart={this.handleDragStart}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleDragEnd}
        >
            <div style={{ backgroundColor: 'black', position: 'absolute', cursor: 'pointer', top, left: 0, width: '100%', height: '100%' }} />
        </Draggable>;
    }

    private handleDragStart = (event: MouseEvent | TouchEvent, dragInformation: DragInformation) => {
        const deltaY = this.props.clamp(this.props.index, dragInformation.current.y - dragInformation.start.y);
        this.setState({ deltaY });
    }

    private handleDragMove = (event: MouseEvent | TouchEvent, dragInformation: DragInformation) => {
        const deltaY = this.props.clamp(this.props.index, dragInformation.current.y - dragInformation.start.y);
        this.setState({ deltaY });
    }

    private handleDragEnd = (event: MouseEvent | TouchEvent | undefined, dragInformation: DragInformation) => {
        this.setState({ deltaY: null });
        const deltaY = this.props.clamp(this.props.index, dragInformation.current.y - dragInformation.start.y);
        this.props.onMove(this.props.index, deltaY);
    }
}

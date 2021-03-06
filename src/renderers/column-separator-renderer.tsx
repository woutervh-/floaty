import * as React from 'react';
import { Draggable, DragInformation } from 'react-managed-draggable';
import * as RenderersModel from '../renderers-model';

interface State {
    deltaY: number | null;
}

export class ColumnSeparatorRenderer<T> extends React.PureComponent<RenderersModel.ColumnSeparatorRendererProps<T>, State> {
    public state: State = {
        deltaY: null
    };

    public render() {
        let top = 0;
        if (this.state.deltaY !== null) {
            top = this.state.deltaY;
        }

        return <Draggable
            onDragStart={this.handleDragStart}
            onDragMove={this.handleDragMove}
            onDragEnd={this.handleDragEnd}
        >
            <this.props.floatyRenderers.columnSeparatorHandleRenderer offset={top} />
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
        if (deltaY !== null) {
            this.props.onMove(this.props.index, deltaY);
        }
    }
}

import * as React from 'react';
import * as RenderersModel from '../renderers-model';
import * as StateModel from '../state-model';

export class LayoutRenderer<T> extends React.PureComponent<RenderersModel.LayoutRendererProps<T>, never> {
    public render() {
        switch (this.props.layout.type) {
            case 'column':
                return this.renderColumn(this.props.layout);
            case 'row':
                return this.renderRow(this.props.layout);
            case 'stack':
                return this.renderStack(this.props.layout);
        }
    }

    private renderColumn(column: StateModel.Column<T>) {
        return <this.props.floatyRenderers.columnRenderer floatyRenderers={this.props.floatyRenderers} floatyManager={this.props.floatyManager} column={column} />;
    }

    private renderRow(row: StateModel.Row<T>) {
        return <this.props.floatyRenderers.rowRenderer floatyRenderers={this.props.floatyRenderers} floatyManager={this.props.floatyManager} row={row} />;
    }

    private renderStack(stack: StateModel.Stack<T>) {
        return <this.props.floatyRenderers.stackRenderer floatyRenderers={this.props.floatyRenderers} floatyManager={this.props.floatyManager} stack={stack} />;
    }
}

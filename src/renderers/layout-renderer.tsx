import * as React from 'react';
import * as Model from '../model';
import * as RenderersModel from './renderers-model';

export class LayoutRenderer extends React.PureComponent<RenderersModel.LayoutRendererProps, never> {
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

    private renderColumn(column: Model.Column) {
        return <this.props.floatyRenderers.columnRenderer floatyRenderers={this.props.floatyRenderers} stateManager={this.props.stateManager} column={column} />;
    }

    private renderRow(row: Model.Row) {
        return <this.props.floatyRenderers.rowRenderer floatyRenderers={this.props.floatyRenderers} stateManager={this.props.stateManager} row={row} />;
    }

    private renderStack(stack: Model.Stack) {
        return <this.props.floatyRenderers.stackRenderer floatyRenderers={this.props.floatyRenderers} stateManager={this.props.stateManager} stack={stack} />;
    }
}

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
        return <this.props.renderers.columnRenderer renderers={this.props.renderers} column={column} onUpdateFractions={this.handleUpdateFractions} />;
    }

    private renderRow(row: Model.Row) {
        return <this.props.renderers.rowRenderer renderers={this.props.renderers} row={row} onUpdateFractions={this.handleUpdateFractions} />;
    }

    private renderStack(stack: Model.Stack) {
        return <this.props.renderers.stackRenderer renderers={this.props.renderers} stack={stack} onActivate={this.handleStackActivate} onStartFloat={this.handleStartFloat} />;
    }

    private handleStackActivate = (stackItem: Model.StackItem) => {

    }

    private handleStartFloat = (stackItem: Model.StackItem) => {

    }

    private handleUpdateFractions = (fractions: number[]) => {
        
    }
}

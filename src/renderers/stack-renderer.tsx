import * as React from 'react';
import * as Model from '../model';
import * as RenderersModel from '../renderers-model';

export class StackRenderer extends React.PureComponent<RenderersModel.StackRendererProps, never> {
    public render() {
        return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${this.props.stack.items.length}, 1fr)`, gridTemplateRows: '20px 1fr' }}>
            {this.props.stack.items.map((stackItem) => {
                return <this.props.floatyRenderers.tabRenderer key={stackItem.key} stackItem={stackItem} onActivate={this.handleActivate} onStartFloat={this.handleStartFloat} />;
            })}
            <this.props.floatyRenderers.contentRenderer stackItem={this.props.stack.items[this.props.stack.active]} />
        </div>;
    }

    private handleActivate = (stackItem: Model.StackItem) => {
        const index = this.props.stack.items.indexOf(stackItem);
        if (index < 0) {
            throw new Error(`Stack item ${stackItem.key} not found.`);
        }
        this.props.stateManager.onActivate(this.props.stack, index);
    }

    private handleStartFloat = (stackItem: Model.StackItem) => {
        const index = this.props.stack.items.indexOf(stackItem);
        if (index < 0) {
            throw new Error(`Stack item ${stackItem.key} not found.`);
        }
        this.props.stateManager.onStartFloat(this.props.stack, index);
    }
}

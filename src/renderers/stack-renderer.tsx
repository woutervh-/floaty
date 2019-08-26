import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class StackRenderer extends React.PureComponent<RenderersModel.StackRendererProps, never> {
    public render() {
        return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${this.props.stack.items.length}, 1fr)`, gridTemplateRows: '20px 1fr' }}>
            {this.props.stack.items.map((stackItem) => {
                return <this.props.floatyRenderers.tabRenderer
                    key={stackItem.identifier}
                    stateManager={this.props.stateManager}
                    stackItem={stackItem}
                />;
            })}
            <div style={{ gridColumn: `1 / span ${this.props.stack.items.length}` }}>
                <this.props.floatyRenderers.contentRenderer
                    key={this.props.stack.items[this.props.stack.active].identifier}
                    stateManager={this.props.stateManager}
                    stackItem={this.props.stack.items[this.props.stack.active]}
                />
            </div>
        </div>;
    }
}

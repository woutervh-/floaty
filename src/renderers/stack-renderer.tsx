import * as React from 'react';
import * as RenderersModel from './renderers-model';

export class StackRenderer extends React.PureComponent<RenderersModel.StackRendererProps, never> {
    public render() {
        return <div style={{ display: 'grid', gridTemplateColumns: `repeat(${this.props.stack.items.length}, 1fr)`, gridTemplateRows: '20px 1fr' }}>
            {this.props.stack.items.map((stackItem) => {
                return <this.props.renderers.tabRenderer key={stackItem.key} stackItem={stackItem} onActivate={this.props.onActivate} onStartFloat={this.props.onStartFloat} />;
            })}
            <this.props.renderers.contentRenderer stackItem={this.props.stack.items[this.props.stack.active]} />
        </div>;
    }
}

import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class StackTabsRenderer<T> extends React.PureComponent<RenderersModel.StackTabsRendererProps<T>, never> {
    public render() {
        return <div style={{ display: 'grid', gridTemplateColumns: `${this.props.stack.items.map(() => 'minmax(min-content, max-content)').join(' ')} 1fr` }}>
            {this.props.children}
        </div>;
    }
}

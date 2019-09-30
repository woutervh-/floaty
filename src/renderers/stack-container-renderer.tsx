import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class StackContainerRenderer<T> extends React.PureComponent<RenderersModel.StackContainerRendererProps<T>, never> {
    public render() {
        return <div style={{
            display: 'grid',
            gridTemplateRows: 'max-content 1fr'
        }}>
            {this.props.children}
        </div>;
    }
}

import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class StackContainerRenderer<T> extends React.PureComponent<RenderersModel.StackContainerRendererProps<T>, never> {
    public render() {
        return <div style={{
            display: 'grid',
            gridTemplateRows: 'max-content 1fr',
            width: '100%',
            height: '100%'
        }}>
            {this.props.children}
        </div>;
    }
}

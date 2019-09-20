import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class StackContainerRenderer extends React.PureComponent<RenderersModel.StackContainerRendererProps, never> {
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

import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class FloatingRenderer extends React.PureComponent<RenderersModel.FloatingRendererProps, never> {
    public render() {
        return <div style={{ display: 'grid', gridTemplateRows: '20px 1fr' }}>
            <this.props.floatyRenderers.floatingTabRenderer floatyManager={this.props.floatyManager} stackItem={this.props.floating} />
            <this.props.floatyRenderers.floatingContentRenderer floatyManager={this.props.floatyManager} stackItem={this.props.floating} />
        </div>;
    }
}

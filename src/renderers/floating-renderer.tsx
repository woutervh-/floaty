import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class FloatingRenderer extends React.PureComponent<RenderersModel.FloatingRendererProps, never> {
    public render() {
        if (!this.props.floating) {
            return null;
        }

        return <div style={{ display: 'grid', gridTemplateRows: '20px 1fr' }}>
            <this.props.floatyRenderers.floatingTabRenderer stateManager={this.props.stateManager} stackItem={this.props.floating} />
            <this.props.floatyRenderers.floatingContentRenderer stateManager={this.props.stateManager} stackItem={this.props.floating} />
        </div>;
    }
}

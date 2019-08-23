import * as React from 'react';
import * as Model from './model';
import * as RenderersModel from './renderers/renderers-model';

interface Props {
    state: Model.State;
    onStateChange: (state: Model.State) => void;
    floatingRenderer: React.ComponentType<RenderersModel.FloatingRendererProps>;
    layoutRenderer: React.ComponentType<RenderersModel.LayoutRendererProps>;
}

export class Floaty extends React.PureComponent<Props, never> {
    public render() {
        return <React.Fragment>
            <this.props.layoutRenderer layout={this.props.state.layout} />
            <this.props.floatingRenderer floating={this.props.state.floating} />
        </React.Fragment>;
    }
}

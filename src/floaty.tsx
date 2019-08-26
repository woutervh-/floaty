import * as React from 'react';
import * as Model from './model';
import * as RenderersModel from './renderers/renderers-model';

interface Props {
    state: Model.State;
    onStateChange: (state: Model.State) => void;
    renderers: RenderersModel.Renderers;
}

export class Floaty extends React.PureComponent<Props, never> {
    public render() {
        return <React.Fragment>
            <this.props.renderers.layoutRenderer renderers={this.props.renderers} layout={this.props.state.layout} />
            <this.props.renderers.floatingRenderer floating={this.props.state.floating} />
        </React.Fragment>;
    }
}

import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class DropAreaRenderer<T> extends React.PureComponent<RenderersModel.DropAreaRendererProps<T>, never> {
    public render() {
        return <div style={{
            position: 'fixed',
            top: this.props.dropArea.top,
            left: this.props.dropArea.left,
            width: this.props.dropArea.width,
            height: this.props.dropArea.height,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        }} />;
    }
}

import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class RowSeparatorHandleRenderer extends React.PureComponent<RenderersModel.RowSeparatorHandleRendererProps, never> {
    public render() {
        return <div style={{
            backgroundColor: 'black',
            position: 'absolute',
            cursor: 'pointer',
            top: 0,
            left: this.props.offset,
            width: '100%',
            height: '100%'
        }} />;
    }
}

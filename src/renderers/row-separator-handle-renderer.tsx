import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class RowSeparatorHandleRenderer extends React.PureComponent<RenderersModel.RowSeparatorHandleRendererProps, never> {
    public render() {
        return <div style={{ position: 'relative', width: 6, height: '100%' }}>
            <div style={{
                backgroundColor: 'black',
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: this.props.offset,
                width: '100%',
                height: '100%'
            }} />
        </div>;
    }
}

import * as React from 'react';
import * as RenderersModel from './renderers-model';

export class ColumnRenderer extends React.PureComponent<RenderersModel.ColumnRendererProps, never> {
    public render() {
        const gridTemplateColumns: string[] = [];
        for (let i = 0; i < this.props.column.items.length; i++) {
            if (i > 0) {
                gridTemplateColumns.push();
            }
        }

        return <div style={{ display: 'grid', gridTemplateColumns: this.props.column.items.map((item) => `${item.fraction}fr`).join(' ') }}>
            {this.props.column.items.map((item) => <this.props.layoutRenderer key={item.key} layout={item.child} />)}
        </div>;
    }
}

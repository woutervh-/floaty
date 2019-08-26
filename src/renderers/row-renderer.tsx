import * as React from 'react';
import * as RenderersModel from './renderers-model';

export class RowRenderer extends React.PureComponent<RenderersModel.RowRendererProps, never> {
    private container: HTMLDivElement | null = null;

    public render() {
        const gridTemplateColumns: string[] = [];
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < this.props.row.items.length; i++) {
            if (i > 0) {
                gridTemplateColumns.push('6px');
                elements.push(<this.props.renderers.rowSeparatorRenderer key={`${this.props.row.items[i].key}-seperator`} index={i} onMove={this.handleMove} />);
            }
            gridTemplateColumns.push(`${this.props.row.items[i]}fr`);
            elements.push(<this.props.renderers.layoutRenderer key={this.props.row.items[i].key} renderers={this.props.renderers} layout={this.props.row.items[i].child} />);
        }

        return <div ref={this.handleRef} style={{ display: 'grid', gridTemplateColumns: gridTemplateColumns.join(' ') }}>
            {elements}
        </div>;
    }

    private handleRef = (ref: HTMLDivElement | null) => {
        this.container = ref;
    }

    private handleMove = (index: number, deltaX: number) => {
        if (this.container) {
            const fractions = this.props.row.items.map((item) => item.fraction);
            const totalFraction = fractions.reduce((sum, fraction) => sum + fraction);
            const totalWidth = this.container.getBoundingClientRect().width;
            const deltaF = totalFraction * (deltaX / totalWidth);
            fractions[index] += deltaF;
            fractions[index + 1] -= deltaF;
            this.props.onUpdateFractions(fractions);
        }
    }
}

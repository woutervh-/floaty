import * as React from 'react';
import * as RenderersModel from './renderers-model';

export class ColumnRenderer extends React.PureComponent<RenderersModel.ColumnRendererProps, never> {
    private container: HTMLDivElement | null = null;

    public render() {
        const gridTemplateRows: string[] = [];
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < this.props.column.items.length; i++) {
            if (i > 0) {
                gridTemplateRows.push('6px');
                elements.push(<this.props.renderers.columnSeparatorRenderer key={`${this.props.column.items[i].key}-seperator`} index={i} onMove={this.handleMove} />);
            }
            gridTemplateRows.push(`${this.props.column.items[i]}fr`);
            elements.push(<this.props.renderers.layoutRenderer key={this.props.column.items[i].key} renderers={this.props.renderers} layout={this.props.column.items[i].child} />);
        }

        return <div ref={this.handleRef} style={{ display: 'grid', gridTemplateRows: gridTemplateRows.join(' ') }}>
            {elements}
        </div>;
    }

    private handleRef = (ref: HTMLDivElement | null) => {
        this.container = ref;
    }

    private handleMove = (index: number, deltaY: number) => {
        if (this.container) {
            const fractions = this.props.column.items.map((item) => item.fraction);
            const totalFraction = fractions.reduce((sum, fraction) => sum + fraction);
            const totalHeight = this.container.getBoundingClientRect().height;
            const deltaF = totalFraction * (deltaY / totalHeight);
            fractions[index] += deltaF;
            fractions[index + 1] -= deltaF;
            this.props.onUpdateFractions(fractions);
        }
    }
}

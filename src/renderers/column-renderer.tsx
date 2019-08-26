import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class ColumnRenderer extends React.PureComponent<RenderersModel.ColumnRendererProps, never> {
    private container: HTMLDivElement | null = null;

    public render() {
        const gridTemplateRows: string[] = [];
        const elements: React.ReactNode[] = [];

        for (let i = 0; i < this.props.column.items.length; i++) {
            if (i > 0) {
                gridTemplateRows.push('6px');
                elements.push(
                    <this.props.floatyRenderers.columnSeparatorRenderer
                        key={`${this.props.column.items[i].key}-seperator`}
                        index={i - 1}
                        onMove={this.handleMove}
                    />
                );
            }
            gridTemplateRows.push(`${this.props.column.items[i].fraction}fr`);
            elements.push(
                <this.props.floatyRenderers.layoutRenderer
                    key={this.props.column.items[i].key}
                    floatyRenderers={this.props.floatyRenderers}
                    stateManager={this.props.stateManager}
                    layout={this.props.column.items[i].child}
                />
            );
        }

        return <div ref={this.handleRef} style={{ display: 'grid', gridTemplateRows: gridTemplateRows.join(' '), width: '100%' }}>
            {elements}
        </div>;
    }

    private handleRef = (ref: HTMLDivElement | null) => {
        this.container = ref;
    }

    private handleMove = (index: number, deltaY: number) => {
        if (this.container) {
            const fractions = this.props.column.items.map((item) => item.fraction);
            const totalHeight = this.container.getBoundingClientRect().height;
            const separatorsHeight = (this.props.column.items.length - 1) * 6;
            const totalFraction = fractions.reduce((sum, fraction) => sum + fraction) + separatorsHeight / totalHeight;
            const deltaF = totalFraction * (deltaY / totalHeight);
            this.props.stateManager.onColumnUpdateFractions(this.props.column, index, fractions[index] + deltaF, index + 1, fractions[index + 1] - deltaF);
        }
    }
}
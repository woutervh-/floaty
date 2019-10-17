import * as React from 'react';
import * as RenderersModel from '../renderers-model';

export class ColumnRenderer<T> extends React.PureComponent<RenderersModel.ColumnRendererProps<T>, never> {
    private container: HTMLDivElement | null = null;

    public render() {
        const gridTemplateRows: string[] = [];
        const elements: React.ReactNode[] = [];
        const minimumFraction = this.props.column.items.reduce((previous, item) => Math.min(previous, item.fraction), Number.POSITIVE_INFINITY);

        for (let i = 0; i < this.props.column.items.length; i++) {
            if (i > 0) {
                gridTemplateRows.push('max-content');
                elements.push(
                    <this.props.floatyRenderers.columnSeparatorRenderer
                        key={`${i}-seperator`}
                        floatyRenderers={this.props.floatyRenderers}
                        index={i - 1}
                        onMove={this.handleMove}
                        clamp={this.clamp}
                    />
                );
            }
            gridTemplateRows.push(`minmax(${this.props.floatyManager.getColumnMinHeight()}px, ${this.props.column.items[i].fraction / minimumFraction}fr)`);
            elements.push(
                <this.props.floatyRenderers.layoutRenderer
                    key={i}
                    floatyRenderers={this.props.floatyRenderers}
                    floatyManager={this.props.floatyManager}
                    layout={this.props.column.items[i].child}
                />
            );
        }

        return <div ref={this.handleRef} style={{ display: 'grid', gridTemplateRows: gridTemplateRows.join(' '), gridTemplateColumns: 'minmax(0, 100%)' }}>
            {elements}
        </div>;
    }

    private handleRef = (ref: HTMLDivElement | null) => {
        this.container = ref;
    }

    private clamp = (index: number, deltaY: number) => {
        if (this.container) {
            const minHeight = this.props.floatyManager.getColumnMinHeight();
            const heightA = this.container.children[index * 2].getBoundingClientRect().height;
            const heightB = this.container.children[index * 2 + 2].getBoundingClientRect().height;
            const minimum = minHeight - heightA;
            const maximum = heightB - minHeight;
            return Math.min(maximum, Math.max(minimum, deltaY));
        }
        return null;
    }

    private handleMove = (index: number, deltaY: number) => {
        if (this.container) {
            const heightA = this.container.children[index * 2].getBoundingClientRect().height;
            const heightS = this.container.children[index * 2 + 1].getBoundingClientRect().height;
            const heightB = this.container.children[index * 2 + 2].getBoundingClientRect().height;
            const heightTotal = heightA + heightS + heightB;
            const fractionA = heightA / heightTotal;
            const fractionS = heightS / heightTotal;
            const fractionB = heightB / heightTotal;
            const fractionTotal = fractionA + fractionS + fractionB;
            const deltaF = fractionTotal * deltaY / heightTotal;
            const fractionOriginal = this.props.column.items[index].fraction + this.props.column.items[index + 1].fraction;
            const normalizer = fractionOriginal / (fractionA + fractionB);

            this.props.floatyManager.updateColumnFractions(
                this.props.column,
                index,
                normalizer * (fractionA + deltaF),
                index + 1,
                normalizer * (fractionB - deltaF)
            );
        }
    }
}

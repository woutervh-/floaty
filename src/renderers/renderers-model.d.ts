import * as Model from '../model';

export interface ColumnRendererProps {
    column: Model.Column;
    layoutRenderer: React.ComponentType<LayoutRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps>;
}

export interface ColumnSeparatorRendererProps {
}

export interface RowRendererProps {
    row: Model.Row;
}

export interface StackRendererProps {
    stack: Model.Stack;
}

export interface LayoutRendererProps {
    layout: Model.Layout;
}

export interface FloatingRendererProps {
    floating: Model.StackItem | null;
}

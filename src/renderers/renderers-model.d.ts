import * as Model from '../model';

export interface ColumnRendererProps {
    renderers: Renderers;
    column: Model.Column;
    onUpdateFractions: (fractions: number[]) => void;
}

export interface RowRendererProps {
    renderers: Renderers;
    row: Model.Row;
    onUpdateFractions: (fractions: number[]) => void;
}

export interface ColumnSeparatorRendererProps {
    index: number;
    onMove: (index: number, deltaY: number) => void;
}

export interface RowSeparatorRendererProps {
    index: number;
    onMove: (index: number, deltaX: number) => void;
}

export interface TabRendererProps {
    stackItem: Model.StackItem;
    onActivate: (stackItem: Model.StackItem) => void;
    onStartFloat: (stackItem: Model.StackItem) => void;
}

export interface ContentRendererProps {
    stackItem: Model.StackItem;
}

export interface StackRendererProps {
    renderers: Renderers;
    stack: Model.Stack;
    onActivate: (stackItem: Model.StackItem) => void;
    onStartFloat: (stackItem: Model.StackItem) => void;
}

export interface LayoutRendererProps {
    renderers: Renderers;
    layout: Model.Layout;
}

export interface FloatingRendererProps {
    floating: Model.StackItem | null;
}

export interface Renderers {
    columnRenderer: React.ComponentType<ColumnRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps>;
    rowRenderer: React.ComponentType<RowRendererProps>;
    rowSeparatorRenderer: React.ComponentType<RowSeparatorRendererProps>;
    stackRenderer: React.ComponentType<StackRendererProps>;
    floatingRenderer: React.ComponentType<FloatingRendererProps>;
    layoutRenderer: React.ComponentType<LayoutRendererProps>;
    tabRenderer: React.ComponentType<TabRendererProps>;
    contentRenderer: React.ComponentType<ContentRendererProps>;
}

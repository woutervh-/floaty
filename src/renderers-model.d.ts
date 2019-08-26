import * as Model from './model';
import { FloatyManager } from './floaty-manager';

export interface ColumnRendererProps {
    floatyManager: FloatyManager;
    floatyRenderers: FloatyRenderers;
    column: Model.Column;
}

export interface RowRendererProps {
    floatyManager: FloatyManager;
    floatyRenderers: FloatyRenderers;
    row: Model.Row;
}

export interface ColumnSeparatorRendererProps {
    index: number;
    onMove: (index: number, deltaY: number) => void;
    clamp: (index: number, deltaY: number) => number;
}

export interface RowSeparatorRendererProps {
    index: number;
    onMove: (index: number, deltaX: number) => void;
    clamp: (index: number, deltaX: number) => number;
}

export interface TabRendererProps {
    floatyManager: FloatyManager;
    stack: Model.Stack;
    stackIndex: number;
    stackItem: Model.StackItem;
}

export interface ContentRendererProps {
    floatyManager: FloatyManager;
    stack: Model.Stack;
    stackIndex: number;
    stackItem: Model.StackItem;
}

export interface StackRendererProps {
    floatyManager: FloatyManager;
    floatyRenderers: FloatyRenderers;
    stack: Model.Stack;
}

export interface LayoutRendererProps {
    floatyManager: FloatyManager;
    floatyRenderers: FloatyRenderers;
    layout: Model.Layout;
}

export interface FloatingTabRendererProps {
    floatyManager: FloatyManager;
    stackItem: Model.StackItem;
}

export interface FloatingContentRendererProps {
    floatyManager: FloatyManager;
    stackItem: Model.StackItem;
}

export interface FloatingRendererProps {
    floatyManager: FloatyManager;
    floatyRenderers: FloatyRenderers;
    floating: Model.StackItem | null;
}

export interface FloatyRenderers {
    columnRenderer: React.ComponentType<ColumnRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps>;
    rowRenderer: React.ComponentType<RowRendererProps>;
    rowSeparatorRenderer: React.ComponentType<RowSeparatorRendererProps>;
    stackRenderer: React.ComponentType<StackRendererProps>;
    floatingTabRenderer: React.ComponentType<FloatingTabRendererProps>;
    floatingContentRenderer: React.ComponentType<FloatingContentRendererProps>;
    floatingRenderer: React.ComponentType<FloatingRendererProps>;
    layoutRenderer: React.ComponentType<LayoutRendererProps>;
    tabRenderer: React.ComponentType<TabRendererProps>;
    contentRenderer: React.ComponentType<ContentRendererProps>;
}

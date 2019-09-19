import * as Model from './model';
import * as DropModel from './drop-model';
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
    floatyRenderers: FloatyRenderers;
    index: number;
    onMove: (index: number, deltaY: number) => void;
    clamp: (index: number, deltaY: number) => number;
}

export interface RowSeparatorRendererProps {
    floatyRenderers: FloatyRenderers;
    index: number;
    onMove: (index: number, deltaX: number) => void;
    clamp: (index: number, deltaX: number) => number;
}

export interface ColumnSeparatorHandleRendererProps {
    offset: number;
}

export interface RowSeparatorHandleRendererProps {
    offset: number;
}

export interface TabRendererProps {
    floatyManager: FloatyManager;
    stack: Model.Stack;
    stackItemIndex: number;
    stackItem: Model.StackItem;
}

export interface TabFillerRendererProps {
    floatyManager: FloatyManager;
    stack: Model.Stack;
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
    floating: Model.StackItem;
}

export interface DropAreaRendererProps {
    floatyManager: FloatyManager;
    dropArea: DropModel.DropArea;
}

export interface FloatyRenderers {
    columnRenderer: React.ComponentType<ColumnRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps>;
    columnSeparatorHandleRenderer: React.ComponentType<ColumnSeparatorHandleRendererProps>;
    rowRenderer: React.ComponentType<RowRendererProps>;
    rowSeparatorRenderer: React.ComponentType<RowSeparatorRendererProps>;
    rowSeparatorHandleRenderer: React.ComponentType<RowSeparatorHandleRendererProps>;
    stackRenderer: React.ComponentType<StackRendererProps>;
    floatingTabRenderer: React.ComponentType<FloatingTabRendererProps>;
    floatingContentRenderer: React.ComponentType<FloatingContentRendererProps>;
    floatingRenderer: React.ComponentType<FloatingRendererProps>;
    dropAreaRenderer: React.ComponentType<DropAreaRendererProps>;
    layoutRenderer: React.ComponentType<LayoutRendererProps>;
    tabRenderer: React.ComponentType<TabRendererProps>;
    tabFillerRenderer: React.ComponentType<TabFillerRendererProps>;
    contentRenderer: React.ComponentType<ContentRendererProps>;
}

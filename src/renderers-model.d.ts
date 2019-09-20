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

export interface StackContainerRendererProps {
    floatyManager: FloatyManager;
    stack: Model.Stack;
}

export interface StackTabsRendererProps {
    floatyManager: FloatyManager;
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
    columnSeparatorHandleRenderer: React.ComponentType<ColumnSeparatorHandleRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps>;
    contentRenderer: React.ComponentType<ContentRendererProps>;
    dropAreaRenderer: React.ComponentType<DropAreaRendererProps>;
    floatingContentRenderer: React.ComponentType<FloatingContentRendererProps>;
    floatingRenderer: React.ComponentType<FloatingRendererProps>;
    floatingTabRenderer: React.ComponentType<FloatingTabRendererProps>;
    layoutRenderer: React.ComponentType<LayoutRendererProps>;
    rowRenderer: React.ComponentType<RowRendererProps>;
    rowSeparatorHandleRenderer: React.ComponentType<RowSeparatorHandleRendererProps>;
    rowSeparatorRenderer: React.ComponentType<RowSeparatorRendererProps>;
    stackContainerRenderer: React.ComponentType<StackContainerRendererProps>;
    stackRenderer: React.ComponentType<StackRendererProps>;
    stackTabsRenderer: React.ComponentType<StackTabsRendererProps>;
    tabFillerRenderer: React.ComponentType<TabFillerRendererProps>;
    tabRenderer: React.ComponentType<TabRendererProps>;
}

// export interface OptionalRenderers {
//     columnRenderer?: React.ComponentType<ColumnRendererProps>;
//     columnSeparatorHandleRenderer?: React.ComponentType<ColumnSeparatorHandleRendererProps>;
//     columnSeparatorRenderer?: React.ComponentType<ColumnSeparatorRendererProps>;
//     contentRenderer: React.ComponentType<ContentRendererProps>;
//     dropAreaRenderer?: React.ComponentType<DropAreaRendererProps>;
//     floatingContentRenderer: React.ComponentType<FloatingContentRendererProps>;
//     floatingRenderer?: React.ComponentType<FloatingRendererProps>;
//     floatingTabRenderer: React.ComponentType<FloatingTabRendererProps>;
//     layoutRenderer?: React.ComponentType<LayoutRendererProps>;
//     rowRenderer?: React.ComponentType<RowRendererProps>;
//     rowSeparatorHandleRenderer?: React.ComponentType<RowSeparatorHandleRendererProps>;
//     rowSeparatorRenderer?: React.ComponentType<RowSeparatorRendererProps>;
//     stackContainerRenderer?: React.ComponentType<StackContainerRendererProps>;
//     stackRenderer?: React.ComponentType<StackRendererProps>;
//     stackTabsRenderer?: React.ComponentType<StackTabsRendererProps>;
//     tabFillerRenderer?: React.ComponentType<TabFillerRendererProps>;
//     tabRenderer: React.ComponentType<TabRendererProps>;
// }

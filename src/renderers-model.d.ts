import * as Model from './model';
import * as DropModel from './drop-model';
import { FloatyManager } from './floaty-manager';

export interface ColumnRendererProps<T> {
    floatyManager: FloatyManager<T>;
    floatyRenderers: FloatyRenderers<T>;
    column: Model.Column<T>;
}

export interface RowRendererProps<T> {
    floatyManager: FloatyManager<T>;
    floatyRenderers: FloatyRenderers<T>;
    row: Model.Row<T>;
}

export interface ColumnSeparatorRendererProps<T> {
    floatyRenderers: FloatyRenderers<T>;
    index: number;
    onMove: (index: number, deltaY: number) => void;
    clamp: (index: number, deltaY: number) => number;
}

export interface RowSeparatorRendererProps<T> {
    floatyRenderers: FloatyRenderers<T>;
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

export interface TabRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stack: Model.Stack<T>;
    stackItemIndex: number;
    stackItem: Model.StackItem<T>;
}

export interface TabFillerRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stack: Model.Stack<T>;
}

export interface ContentRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stack: Model.Stack<T>;
    stackIndex: number;
    stackItem: Model.StackItem<T>;
}

export interface StackRendererProps<T> {
    floatyManager: FloatyManager<T>;
    floatyRenderers: FloatyRenderers<T>;
    stack: Model.Stack<T>;
}

export interface StackContainerRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stack: Model.Stack<T>;
}

export interface StackTabsRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stack: Model.Stack<T>;
}

export interface LayoutRendererProps<T> {
    floatyManager: FloatyManager<T>;
    floatyRenderers: FloatyRenderers<T>;
    layout: Model.Layout<T>;
}

export interface FloatingTabRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stackItem: Model.StackItem<T>;
}

export interface FloatingContentRendererProps<T> {
    floatyManager: FloatyManager<T>;
    stackItem: Model.StackItem<T>;
}

export interface FloatingRendererProps<T> {
    floatyManager: FloatyManager<T>;
    floatyRenderers: FloatyRenderers<T>;
    floating: Model.StackItem<T>;
}

export interface DropAreaRendererProps<T> {
    floatyManager: FloatyManager<T>;
    dropArea: DropModel.DropArea;
}

export interface FloatyRenderers<T> {
    columnRenderer: React.ComponentType<ColumnRendererProps<T>>;
    columnSeparatorHandleRenderer: React.ComponentType<ColumnSeparatorHandleRendererProps>;
    columnSeparatorRenderer: React.ComponentType<ColumnSeparatorRendererProps<T>>;
    contentRenderer: React.ComponentType<ContentRendererProps<T>>;
    dropAreaRenderer: React.ComponentType<DropAreaRendererProps<T>>;
    floatingContentRenderer: React.ComponentType<FloatingContentRendererProps<T>>;
    floatingRenderer: React.ComponentType<FloatingRendererProps<T>>;
    floatingTabRenderer: React.ComponentType<FloatingTabRendererProps<T>>;
    layoutRenderer: React.ComponentType<LayoutRendererProps<T>>;
    rowRenderer: React.ComponentType<RowRendererProps<T>>;
    rowSeparatorHandleRenderer: React.ComponentType<RowSeparatorHandleRendererProps>;
    rowSeparatorRenderer: React.ComponentType<RowSeparatorRendererProps<T>>;
    stackContainerRenderer: React.ComponentType<StackContainerRendererProps<T>>;
    stackRenderer: React.ComponentType<StackRendererProps<T>>;
    stackTabsRenderer: React.ComponentType<StackTabsRendererProps<T>>;
    tabFillerRenderer: React.ComponentType<TabFillerRendererProps<T>>;
    tabRenderer: React.ComponentType<TabRendererProps<T>>;
}

import * as Model from './model';
import { StateManager } from './state-manager';

export interface ColumnRendererProps {
    stateManager: StateManager;
    floatyRenderers: FloatyRenderers;
    column: Model.Column;
}

export interface RowRendererProps {
    stateManager: StateManager;
    floatyRenderers: FloatyRenderers;
    row: Model.Row;
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
    stateManager: StateManager;
    stackItem: Model.StackItem;
}

export interface ContentRendererProps {
    stateManager: StateManager;
    stackItem: Model.StackItem;
}

export interface StackRendererProps {
    stateManager: StateManager;
    floatyRenderers: FloatyRenderers;
    stack: Model.Stack;
}

export interface LayoutRendererProps {
    stateManager: StateManager;
    floatyRenderers: FloatyRenderers;
    layout: Model.Layout;
}

export interface FloatingTabRendererProps {
    stateManager: StateManager;
    stackItem: Model.StackItem;
}

export interface FloatingContentRendererProps {
    stateManager: StateManager;
    stackItem: Model.StackItem;
}

export interface FloatingRendererProps {
    stateManager: StateManager;
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

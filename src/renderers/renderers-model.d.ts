import * as Model from '../model';
import { StateManager } from '../state-manager';

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
    stackItem: Model.StackItem;
    onActivate: (stackItem: Model.StackItem) => void;
    onStartFloat: (stackItem: Model.StackItem) => void;
}

export interface ContentRendererProps {
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

export interface FloatingRendererProps {
    floating: Model.StackItem | null;
}

export interface FloatyRenderers {
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

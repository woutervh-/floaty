export interface ElementReference {
    identifier: string;
}

export interface ColumnItem {
    key: string;
    fraction: number;
    child: Layout;
}

export interface Column {
    type: 'column';
    items: ColumnItem[];
}

export interface RowItem {
    key: string;
    fraction: number;
    child: Layout;
}

export interface Row {
    type: 'row';
    items: RowItem[];
}

export interface StackItem {
    key: string;
    tab: ElementReference;
    content: ElementReference;
}

export interface Stack {
    type: 'stack';
    items: StackItem[];
    active: number;
}

export type Layout = Column | Row | Stack;

export interface State {
    layout: Layout;
    floating: StackItem | null;
}

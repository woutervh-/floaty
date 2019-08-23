export interface Element {
    key: string;
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
    title: Element;
    content: Element;
}

export interface Stack {
    type: 'stack';
    items: StackItem[];
}

export type Layout = Column | Row | Stack;

export interface State {
    layout: Layout;
    floating: StackItem | null;
}

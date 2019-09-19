export interface ColumnOrRowItem {
    fraction: number;
    child: Layout;
}

export interface Column {
    type: 'column';
    items: ColumnOrRowItem[];
}

export interface Row {
    type: 'row';
    items: ColumnOrRowItem[];
}

export interface StackItem {
    identifier: string;
}

export interface Stack {
    type: 'stack';
    items: StackItem[];
    active: number;
}

export type Layout = Column | Row | Stack;

export type Item = ColumnOrRowItem | StackItem;

export interface State {
    layout: Layout | null;
    floating: StackItem | null;
}

export interface ColumnOrRowItem<T> {
    fraction: number;
    child: Layout<T>;
}

export interface Column<T> {
    type: 'column';
    items: ColumnOrRowItem<T>[];
}

export interface Row<T> {
    type: 'row';
    items: ColumnOrRowItem<T>[];
}

export interface StackItem<T> {
    key: string;
    item: T;
}

export interface Stack<T> {
    type: 'stack';
    items: StackItem<T>[];
    active: number;
}

export type Layout<T> = Column<T> | Row<T> | Stack<T>;

export type Item<T> = ColumnOrRowItem<T> | StackItem<T>;

export interface State<T> {
    layout: Layout<T> | null;
    floating: StackItem<T> | null;
}

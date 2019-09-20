import * as ReactManagedDragable from 'react-managed-draggable';
import * as Model from './model';
import * as DropModel from './drop-model';

interface FloatingStartPosition {
    initialPosition: ReactManagedDragable.XY;
}

interface FloatingStartEvent {
    event: MouseEvent | TouchEvent;
}

interface FloatingStartEventAndTarget {
    event: MouseEvent | TouchEvent;
    eventTarget: HTMLElement;
}

interface FloatingStartEventTargetAndPosition {
    eventTarget: HTMLElement;
    initialPosition: ReactManagedDragable.XY;
}

interface FloatingStartEventAndPosition {
    event: MouseEvent | TouchEvent;
    initialPosition: ReactManagedDragable.XY;
}

export type FloatingStartOptions = FloatingStartPosition | FloatingStartEvent | FloatingStartEventAndTarget | FloatingStartEventTargetAndPosition | FloatingStartEventAndPosition;

export interface FloatyManager<T> {
    onColumnUpdateFractions: (column: Model.Column<T>, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onRowUpdateFractions: (row: Model.Row<T>, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onActivate: (stackItem: Model.StackItem<T>) => void;
    onStartFloat: (stackItem: Model.StackItem<T>, options: FloatingStartOptions) => void;
    onCloseTab: (stackItem: Model.StackItem<T>) => void;
    getLayout: () => Model.Layout<T> | null;
    findStack: (stackItem: Model.StackItem<T>) => Model.Stack<T> | null;
    registerDropResolutions: (key: unknown, dropResolutions: DropModel.DropResolution<T>[]) => void;
    unregisterDropResolutions: (key: unknown) => void;
}

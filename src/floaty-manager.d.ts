import * as ReactManagedDragable from 'react-managed-draggable';
import * as StateModel from './state-model';
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
    onColumnUpdateFractions: (column: StateModel.Column<T>, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onRowUpdateFractions: (row: StateModel.Row<T>, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onActivate: (stackItem: StateModel.StackItem<T>) => void;
    onStartFloat: (stackItem: StateModel.StackItem<T>, options: FloatingStartOptions) => void;
    onCloseTab: (stackItem: StateModel.StackItem<T>) => void;
    getLayout: () => StateModel.Layout<T> | null;
    findStack: (stackItem: StateModel.StackItem<T>) => StateModel.Stack<T> | null;
    replaceItem: (stackItem: StateModel.StackItem<T>, item: T) => void;
    registerDropResolutions: (key: unknown, dropResolutions: DropModel.DropResolution<T>[]) => void;
    unregisterDropResolutions: (key: unknown) => void;
}

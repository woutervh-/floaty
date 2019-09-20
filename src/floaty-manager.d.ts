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

export interface FloatyManager {
    onColumnUpdateFractions: (column: Model.Column, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onRowUpdateFractions: (row: Model.Row, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onActivate: (stackItem: Model.StackItem) => void;
    onStartFloat: (stackItem: Model.StackItem, options: FloatingStartOptions) => void;
    onCloseTab: (stackItem: Model.StackItem) => void;
    getLayout: () => Model.Layout | null;
    findStack: (stackItem: Model.StackItem) => Model.Stack | null;
    registerDropResolutions: (key: unknown, dropResolutions: DropModel.DropResolution[]) => void;
    unregisterDropResolutions: (key: unknown) => void;
}

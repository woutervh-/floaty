import * as Model from './model';

export interface FloatyManager {
    onColumnUpdateFractions: (column: Model.Column, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onRowUpdateFractions: (row: Model.Row, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onActivate: (stackItem: Model.StackItem) => void;
    onStartFloat: (stackItem: Model.StackItem) => void;
    onCloseTab: (stackItem: Model.StackItem) => void;
    getLayout: () => Model.Layout | null;
    findStack: (stackItem: Model.StackItem) => Model.Stack | null;
}

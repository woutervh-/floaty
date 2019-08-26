import * as Model from './model';

export interface StateManager {
    onColumnUpdateFractions: (column: Model.Column, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onRowUpdateFractions: (row: Model.Row, index1: number, fraction1: number, index2: number, fraction2: number) => void;
    onActivate: (stack: Model.Stack, index: number) => void;
    onStartFloat: (stack: Model.Stack, index: number) => void;
}

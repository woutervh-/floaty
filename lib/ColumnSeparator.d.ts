/// <reference types="react" />
import * as React from 'react';
import { EventEmitter } from 'eventemitter3';
import { IFloatyContext } from './Types';
import { IDraggableEventWithDelta } from './Draggable';
export interface IColumnSeparatorProps {
    getBounds: () => {
        min: number;
        max: number;
    };
    onPositionChange: (offset: number) => void;
}
export interface IColumnSeparatorState {
    offset: number;
}
export declare class ColumnSeparator extends React.Component<IColumnSeparatorProps & React.HTMLProps<ColumnSeparator>, IColumnSeparatorState> {
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    state: {
        offset: number;
    };
    draggable: EventEmitter;
    shouldComponentUpdate(nextProps: any, nextState: any, nextContext: any): boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    clampOffset(offset: number): number;
    handleDragStart(): void;
    handleDrag(event: IDraggableEventWithDelta): void;
    handleDragStop(): void;
    render(): JSX.Element;
}

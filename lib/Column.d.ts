/// <reference types="react" />
import * as React from 'react';
import * as Redux from 'redux';
import { ColumnSeparator } from './ColumnSeparator';
import ColumnItem from './ColumnItem';
import { IFloatyContext } from './Types';
import { IFloatyState } from './reducers/index';
import { IResolvableDropArea, IDropAreaResolution } from './DropAreaTypes';
export default class Column extends React.Component<{
    id: string;
    dispatch: Redux.Dispatch<IFloatyState>;
    growValues: Array<number>;
    items: Array<any>;
} & React.AllHTMLAttributes<HTMLDivElement>, any> implements IResolvableDropArea {
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    items: {
        [key: string]: ColumnItem;
    };
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    getHeightForColumnItem(index: number): number;
    getBoundsForSeparator(index: number): {
        min: number;
        max: number;
    };
    renderColumnItems(): Array<React.ReactElement<ColumnItem> | React.ReactElement<ColumnSeparator>>;
    handlePositionChange(index: number, offset: number): void;
    resolveDropArea(position: {
        x: number;
        y: number;
    }): IDropAreaResolution;
    render(): JSX.Element;
}

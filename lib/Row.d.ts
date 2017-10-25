/// <reference types="react" />
import * as React from 'react';
import * as Redux from 'redux';
import { RowSeparator } from './RowSeparator';
import RowItem from './RowItem';
import { IFloatyContext } from './Types';
import { IFloatyState } from './reducers/index';
import { IResolvableDropArea, IDropAreaResolution } from './DropAreaTypes';
export default class Row extends React.Component<{
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
        [key: string]: RowItem;
    };
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    getWidthForRowItem(index: number): number;
    getBoundsForSeparator(index: number): {
        min: number;
        max: number;
    };
    renderRowItems(): Array<React.ReactElement<RowItem> | React.ReactElement<RowSeparator>>;
    handlePositionChange(index: number, offset: number): void;
    resolveDropArea(position: {
        x: number;
        y: number;
    }): IDropAreaResolution;
    render(): JSX.Element;
}

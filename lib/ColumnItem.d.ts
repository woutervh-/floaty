/// <reference types="react" />
import * as React from 'react';
import { ItemBase } from './Item';
import { IFloatyContext } from './Types';
import { IResolvableDropArea, IDropAreaResolution } from './DropAreaTypes';
export default class ColumnItem extends React.Component<{
    value: any;
} & React.AllHTMLAttributes<HTMLDivElement>, any> implements IResolvableDropArea {
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    item: ItemBase;
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    resolveDropArea(position: {
        x: number;
        y: number;
    }): IDropAreaResolution;
    render(): JSX.Element;
}

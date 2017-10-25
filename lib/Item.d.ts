/// <reference types="react" />
import * as React from 'react';
import { IFloatyContext } from './Types';
import { IFloatyItem } from './reducers/index';
import { IResolvableDropArea, IDropAreaResolution } from './DropAreaTypes';
export interface IFloatyItemProps {
    id: string;
    floatyStackId?: string;
    floatyStackIndex?: number;
}
export interface IFloatyItemSelectedProps extends IFloatyItem {
    name?: string;
    content?: any;
    type: string;
}
export declare class ItemBase extends React.Component<any, any> implements IResolvableDropArea {
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    item: IResolvableDropArea;
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    resolveDropArea(position: {
        x: number;
        y: number;
    }): IDropAreaResolution;
    renderLeafComponent(): React.ReactElement<any> | null;
    render(): React.ReactElement<any> | null;
}
export declare const Item: React.ComponentClass<Pick<any, never> & IFloatyItemProps> & {
    WrappedComponent: React.ComponentType<any>;
};

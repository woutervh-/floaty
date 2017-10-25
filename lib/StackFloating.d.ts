/// <reference types="react" />
import * as React from 'react';
import { IFloatyContext } from './Types';
export interface IFloatyStackFloatingProps {
    title: any;
    item: any;
    x: number;
    y: number;
}
export default class StackFloating extends React.Component<IFloatyStackFloatingProps & React.AllHTMLAttributes<HTMLDivElement>, any> {
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    renderHeaderTab(): JSX.Element;
    renderHeaderTabs(): JSX.Element;
    renderHeader(): JSX.Element;
    render(): JSX.Element;
}

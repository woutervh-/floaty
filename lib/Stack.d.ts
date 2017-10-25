/// <reference types="react" />
import * as React from 'react';
import * as Redux from 'redux';
import { IFloatyContext } from './Types';
import { EventEmitter } from 'eventemitter3';
import { IDropAreaResolution } from './DropAreaTypes';
import { IFloatyState } from './reducers/index';
export interface IFloatyStackProps {
    id: string;
    active: number;
    titles: Array<any>;
    items: Array<string>;
    dispatch: Redux.Dispatch<IFloatyState>;
}
export default class Stack extends React.Component<IFloatyStackProps & React.AllHTMLAttributes<HTMLDivElement>, any> {
    static defaultProps: {
        active: number;
    };
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    context: {
        floatyContext: IFloatyContext;
    };
    tabs: {
        [key: string]: HTMLLIElement;
    };
    header: HTMLDivElement;
    container: HTMLDivElement;
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    unmakeDraggablesTimeout: number | null;
    draggables: Array<EventEmitter>;
    componentDidMount(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    makeDraggables(): void;
    unmakeDraggables(callback?: () => void): void;
    handleDragStart(index: number): void;
    handleTabClick(index: number): void;
    resolveDropArea(position: {
        x: number;
        y: number;
    }): IDropAreaResolution;
    renderTabs(): JSX.Element;
    renderHeader(): JSX.Element;
    render(): JSX.Element;
}

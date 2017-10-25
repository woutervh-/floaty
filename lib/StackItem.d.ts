/// <reference types="react" />
import * as React from 'react';
export interface IFloatyStackItemProps {
    value: any;
}
export default class StackItem extends React.Component<IFloatyStackItemProps & React.AllHTMLAttributes<HTMLDivElement>, any> {
    static propTypes: {
        value: React.Validator<any>;
    };
    static contextTypes: {
        floatyContext: React.Validator<any>;
    };
    shouldComponentUpdate(nextProps: any, _: any, nextContext: any): boolean;
    render(): JSX.Element;
}

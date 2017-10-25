/// <reference types="react" />
import * as React from 'react';
export interface IFloatyContext {
    float: (item: string, title: any) => void;
    theme: any;
    refs: any;
}
export declare const floatyContextType: React.Validator<any>;

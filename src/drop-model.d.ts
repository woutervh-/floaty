import * as Model from './model';

export interface DropArea {
    top: number
    left: number
    width: number
    height: number
}

export interface DropResolutionTab {
    type: 'tab';
    dropArea: DropArea;
    stack: Model.Stack;
    index: number;
}

export interface DropResolutionContainer {
    type: 'container';
    dropArea: DropArea;
    stack: Model.Stack;
}

export type DropResolution = DropResolutionTab | DropResolutionContainer;

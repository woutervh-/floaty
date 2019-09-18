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
    stackItem: Model.StackItem | null;
}

export interface DropResolutionContent {
    type: 'content';
    dropArea: DropArea;
}

export type DropResolution = DropResolutionTab | DropResolutionContent;

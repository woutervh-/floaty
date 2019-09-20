import * as ReactManagedDraggable from 'react-managed-draggable';
import * as Model from './model';

export interface DropArea {
    top: number;
    left: number;
    width: number;
    height: number;
}

export interface DropResolutionTab<T> {
    type: 'tab';
    dropArea: DropArea;
    stack: Model.Stack<T>;
    index: number;
}

export interface DropResolutionContainer<T> {
    type: 'container';
    dropArea: DropArea;
    stack: Model.Stack<T>;
}

export interface DropResolutionRoot {
    type: 'root';
    dropArea: DropArea;
}

export type DropResolution<T> = DropResolutionTab<T> | DropResolutionContainer<T>;

export const computeDropArea = (element: Element): DropArea => {
    const clientRect = element.getBoundingClientRect();
    return {
        top: clientRect.top,
        left: clientRect.left,
        width: clientRect.width,
        height: clientRect.height
    };
};

export const dropAreasEqual = (dropAreaA: DropArea, dropAreaB: DropArea): boolean => {
    return dropAreaA.top === dropAreaB.top
        && dropAreaA.left === dropAreaB.left
        && dropAreaA.width === dropAreaB.width
        && dropAreaA.height === dropAreaB.height;
};

export const pointInDropArea = (dropArea: DropArea, point: ReactManagedDraggable.XY) => {
    return dropArea.top <= point.y
        && point.y <= dropArea.top + dropArea.height
        && dropArea.left <= point.x
        && point.x <= dropArea.left + dropArea.width;
};

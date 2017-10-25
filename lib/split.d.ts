import * as Redux from 'redux';
import { IFloatyState } from './reducers/index';
import { IDropAreaResolution } from './DropAreaTypes';
export default function split(element: HTMLElement, position: {
    x: number;
    y: number;
}, id: string, dispatch: Redux.Dispatch<IFloatyState>): IDropAreaResolution;

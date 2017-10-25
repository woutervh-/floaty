import {transformIntoColumn, transformIntoRow} from './actions';
import * as DomUtil from './DomUtil';
import * as Redux from 'redux';
import {IFloatyItem, IFloatyState, IFloatyStack} from './reducers/index';
import {IDropAreaResolution} from './DropAreaTypes';

export default function split(element: HTMLElement, position: {x: number, y: number}, id: string, dispatch: Redux.Dispatch<IFloatyState>): IDropAreaResolution {
    const box = DomUtil.elementOffset(element);
    const leftBox = {...box, width: 0.2 * box.width} as DomUtil.IBox;
    const rightBox = {...box, x: box.x + box.width * 0.8, width: 0.2 * box.width} as DomUtil.IBox;
    const topBox = {...box, x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5} as DomUtil.IBox;
    const bottomBox = {...box, x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5} as DomUtil.IBox;
    if (DomUtil.isWithinBox(position, leftBox)) {
        // Make row here: floating content to the left, original content to the right
        return {
            ...box,
            width: box.width / 2,
            execute: (item: string, title: any) => dispatch(transformIntoRow(id, {type: 'stack', items: [item], titles: [title]} as IFloatyStack, true)),
            resolved: true
        };
    }
    if (DomUtil.isWithinBox(position, rightBox)) {
        // Make row here: floating content to the right, original content to the left
        return {
            ...box,
            x: box.x + box.width / 2,
            width: box.width / 2,
            execute: (item: string, title: any) => dispatch(transformIntoRow(id, {type: 'stack', items: [item], titles: [title]} as IFloatyStack, false)),
            resolved: true
        };
    }
    if (DomUtil.isWithinBox(position, topBox)) {
        return {
            ...box,
            height: box.height / 2,
            execute: (item: string, title: any) => dispatch(transformIntoColumn(id, {type: 'stack', items: [item], titles: [title]} as IFloatyStack, true)),
            resolved: true
        };
    }
    if (DomUtil.isWithinBox(position, bottomBox)) {
        return {
            ...box,
            y: box.y + box.height / 2,
            height: box.height / 2,
            execute: (item: string, title: any) => dispatch(transformIntoColumn(id, {type: 'stack', items: [item], titles: [title]} as IFloatyStack, false)),
            resolved: true
        };
    }
    return {x: 0, y: 0, width: 0, height: 0, resolved: false};
};

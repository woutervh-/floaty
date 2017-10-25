import { EventEmitter } from 'eventemitter3';
export interface IDraggableEvent {
    originalEvent: MouseEvent;
    position: {
        x: number;
        y: number;
    };
}
export interface IDraggableEventWithDelta extends IDraggableEvent {
    dx: number;
    dy: number;
}
export default function Draggable(element: HTMLElement, threshold?: number): EventEmitter;

export interface IBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export function elementOffset(element: HTMLElement) {
    const elementOffset = {x: element.offsetLeft, y: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight};
    let parent = element.offsetParent as HTMLElement;
    while (parent != null) {
        elementOffset.x += parent.offsetLeft;
        elementOffset.y += parent.offsetTop;
        parent = parent.offsetParent as HTMLElement;
    }
    return elementOffset;
}

export function isWithinBox(point: {x: number, y: number}, box: {x: number, y: number, width: number, height: number}) {
    return box.x <= point.x && point.x <= box.x + box.width && box.y <= point.y && point.y <= box.y + box.height;
}

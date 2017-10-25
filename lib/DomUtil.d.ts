export interface IBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare function elementOffset(element: HTMLElement): {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare function isWithinBox(point: {
    x: number;
    y: number;
}, box: {
    x: number;
    y: number;
    width: number;
    height: number;
}): boolean;

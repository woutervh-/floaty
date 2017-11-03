import { IFloatyTransformIntoColumnOrRow, IFloatyActionWithMeta } from '../actions/index';
export interface IFloatyItem {
    type: string;
    state?: any;
    [key: string]: any;
}
export interface IFloatyNodeItem extends IFloatyItem {
    items: Array<string>;
}
export interface IFloatyStack extends IFloatyNodeItem {
    active: number;
    titles: Array<any>;
}
export interface IFloatyColumnOrRow extends IFloatyNodeItem {
    growValues?: Array<number>;
}
export interface IFloatyItems {
    [key: string]: IFloatyItem;
}
export interface IFloatyLayout {
    item: string | undefined;
    floatingItem: string | null | undefined;
    floatingTitle: any | null | undefined;
}
export interface IFloatyLayouts {
    [key: string]: IFloatyLayout;
}
export interface IFloatyState {
    items: IFloatyItems;
    layouts: IFloatyLayouts;
}
export interface IFloatyTransformIntoColumnOrRowItems extends IFloatyTransformIntoColumnOrRow {
    items: Array<string>;
}
export default function floaty(state: IFloatyState | undefined, action: IFloatyActionWithMeta): IFloatyState;

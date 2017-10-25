import * as Redux from 'redux';
import { IFloatyItem } from '../reducers/index';
export interface IFloatyActionWithMeta extends Redux.Action {
    meta?: any;
}
export interface IFloatySetGrowValues extends IFloatyActionWithMeta {
    itemId: string;
    growValues: Array<number>;
}
export declare function setGrowValues(itemId: string, growValues: Array<number>): IFloatySetGrowValues;
export interface IFloatySetActiveTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
}
export declare function setActiveTab(itemId: string, index: number): IFloatySetActiveTab;
export interface IFloatyRemoveTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
}
export declare function removeTab(itemId: string, index: number): IFloatyRemoveTab;
export interface IFloatyRemoveActiveTab extends IFloatyActionWithMeta {
    itemId: string;
}
export declare function removeActiveTab(itemId: string): IFloatyRemoveActiveTab;
export interface IFloatyInsertTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
    item: string;
    title: any;
}
export declare function insertTab(itemId: string, index: number, item: string, title: any): IFloatyInsertTab;
export interface IFloatyAddTab extends IFloatyActionWithMeta {
    itemId: string;
    item: string;
    title: any;
}
export declare function addTab(itemId: string, item: string, title: any): IFloatyAddTab;
export interface IFloatyTransformIntoColumnOrRow extends IFloatyActionWithMeta {
    itemId: string;
    item: IFloatyItem;
    newItemsBefore: boolean;
    newId1: string;
    newId2: string;
}
export declare function transformIntoColumn(itemId: string, item: IFloatyItem, newItemsBefore: boolean, newId1?: string, newId2?: string): IFloatyTransformIntoColumnOrRow;
export declare function transformIntoRow(itemId: string, item: IFloatyItem, newItemsBefore: boolean, newId1?: string, newId2?: string): IFloatyTransformIntoColumnOrRow;
export interface IFloatySetLayout extends IFloatyActionWithMeta {
    layoutId: string;
    item: IFloatyItem;
    itemId: string;
}
export declare function setLayout(layoutId: string, item: IFloatyItem, itemId?: string): IFloatySetLayout;
export interface IFloatyStartFloating extends IFloatyActionWithMeta {
    layoutId: string;
    item: string;
    title: any;
}
export declare function startFloating(layoutId: string, item: string, title: any): IFloatyStartFloating;
export interface IFloatyStopFloating extends IFloatyActionWithMeta {
    layoutId: string;
}
export declare function stopFloating(layoutId: string): IFloatyStopFloating;
export interface IFloatyAddItem extends IFloatyActionWithMeta {
    itemId: string;
    item: IFloatyItem;
}
export declare function addItem(itemId: string, item: IFloatyItem): IFloatyAddItem;
export interface IFloatySetItemState extends IFloatyActionWithMeta {
    itemId: string;
    state: any;
}
export declare function setItemState(itemId: string, state: any): IFloatySetItemState;

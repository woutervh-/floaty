import * as Redux from 'redux';
import {
    FLOATY_ADD_TAB,
    FLOATY_ADD_ITEM,
    FLOATY_INSERT_TAB,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_ACTIVE_TAB,
    FLOATY_SET_GROW_VALUES,
    FLOATY_SET_LAYOUT,
    FLOATY_START_FLOATING,
    FLOATY_STOP_FLOATING,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW,
    FLOATY_SET_ITEM_STATE
} from '../constants';
import {generateIdentifier} from '../identifiers';
import {IFloatyItem} from '../reducers/index';

export interface IFloatyActionWithMeta extends Redux.Action {
    meta?: any;
}

export interface IFloatySetGrowValues extends IFloatyActionWithMeta {
    itemId: string;
    growValues: Array<number>;
}

export function setGrowValues(itemId: string, growValues: Array<number>): IFloatySetGrowValues {
    return {
        type: FLOATY_SET_GROW_VALUES,
        itemId,
        growValues
    };
}

export interface IFloatySetActiveTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
}

export function setActiveTab(itemId: string, index: number): IFloatySetActiveTab {
    return {
        type: FLOATY_SET_ACTIVE_TAB,
        itemId,
        index
    };
}

export interface IFloatyRemoveTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
}

export function removeTab(itemId: string, index: number): IFloatyRemoveTab {
    return {
        type: FLOATY_REMOVE_TAB,
        itemId,
        index,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}

export interface IFloatyRemoveActiveTab extends IFloatyActionWithMeta {
    itemId: string;
}

export function removeActiveTab(itemId: string): IFloatyRemoveActiveTab {
    return {
        type: FLOATY_REMOVE_ACTIVE_TAB,
        itemId
    };
}

export interface IFloatyInsertTab extends IFloatyActionWithMeta {
    itemId: string;
    index: number;
    item: string;
    title: any;
}

export function insertTab(itemId: string, index: number, item: string, title: any): IFloatyInsertTab {
    return {
        type: FLOATY_INSERT_TAB,
        itemId,
        index,
        item,
        title
    };
}

export interface IFloatyAddTab extends IFloatyActionWithMeta {
    itemId: string;
    item: string;
    title: any;
}

export function addTab(itemId: string, item: string, title: any): IFloatyAddTab {
    return {
        type: FLOATY_ADD_TAB,
        itemId,
        item,
        title
    };
}

export interface IFloatyTransformIntoColumnOrRow extends IFloatyActionWithMeta {
    itemId: string;
    item: IFloatyItem;
    newItemsBefore: boolean;
    newId1: string;
    newId2: string;
}

export function transformIntoColumn(itemId: string, item: IFloatyItem, newItemsBefore: boolean, newId1: string = generateIdentifier(), newId2: string = generateIdentifier()): IFloatyTransformIntoColumnOrRow {
    return {
        type: FLOATY_TRANSFORM_INTO_COLUMN,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}

export function transformIntoRow(itemId: string, item: IFloatyItem, newItemsBefore: boolean, newId1: string = generateIdentifier(), newId2: string = generateIdentifier()): IFloatyTransformIntoColumnOrRow {
    return {
        type: FLOATY_TRANSFORM_INTO_ROW,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}

export interface IFloatySetLayout extends IFloatyActionWithMeta {
    layoutId: string;
    item: IFloatyItem;
    itemId: string;
}

export function setLayout(layoutId: string, item: IFloatyItem, itemId: string = generateIdentifier()): IFloatySetLayout {
    return {
        type: FLOATY_SET_LAYOUT,
        layoutId,
        item,
        itemId,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}

export interface IFloatyStartFloating extends IFloatyActionWithMeta {
    layoutId: string;
    item: string;
    title: any;
}

export function startFloating(layoutId: string, item: string, title: any): IFloatyStartFloating {
    return {
        type: FLOATY_START_FLOATING,
        layoutId,
        item,
        title
    };
}

export interface IFloatyStopFloating extends IFloatyActionWithMeta {
    layoutId: string;
}

export function stopFloating(layoutId: string): IFloatyStopFloating {
    return {
        type: FLOATY_STOP_FLOATING,
        layoutId,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}

export interface IFloatyAddItem extends IFloatyActionWithMeta {
    itemId: string;
    item: IFloatyItem;
}

export function addItem(itemId: string, item: IFloatyItem): IFloatyAddItem {
    return {
        type: FLOATY_ADD_ITEM,
        itemId,
        item
    };
}

export interface IFloatySetItemState extends IFloatyActionWithMeta {
    itemId: string;
    state: any;
}

export function setItemState(itemId: string, state: any): IFloatySetItemState {
    return {
        type: FLOATY_SET_ITEM_STATE,
        itemId,
        state
    };
}

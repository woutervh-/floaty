import * as Redux from 'redux';
import {FLOATY_ADD_ITEM, FLOATY_ADD_TAB, FLOATY_INSERT_TAB, FLOATY_REMOVE_ACTIVE_TAB, FLOATY_REMOVE_TAB, FLOATY_SET_ACTIVE_TAB, FLOATY_SET_GROW_VALUES, FLOATY_SET_LAYOUT, FLOATY_START_FLOATING, FLOATY_STOP_FLOATING, FLOATY_TRANSFORM_INTO_COLUMN, FLOATY_TRANSFORM_INTO_ROW, FLOATY_SET_ITEM_STATE} from '../constants';
import {IFloatySetGrowValues, IFloatyRemoveTab, IFloatyInsertTab, IFloatyAddTab, IFloatySetActiveTab, IFloatyStartFloating, IFloatySetLayout, IFloatyAddItem, IFloatySetItemState, IFloatyTransformIntoColumnOrRow, IFloatyActionWithMeta} from '../actions/index';

export interface IFloatyItem {
    type: string;
    state?: any;
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

function minimizeColumnOrRow(itemId: string, floatyItems: IFloatyItems, minimized: {[key: string]: string | undefined}, type: string): string | undefined {
    const items: Array<string> = [];
    const growValues: Array<number> = [];
    const self = floatyItems[itemId] as IFloatyColumnOrRow;
    for (let i = 0; i < self.items.length; i++) {
        const child = self.items[i];
        const childItem = minimize(child, floatyItems, minimized);
        if (childItem !== undefined) {
            const growValue = self.growValues && self.growValues[i] || 1;
            if (floatyItems[childItem as string].type === type) {
                let growValuesSum = 0;
                for (let j = 0; j < (floatyItems[childItem as string] as IFloatyColumnOrRow).items.length; j++) {
                    const childGrowValues = (floatyItems[childItem as string] as IFloatyColumnOrRow).growValues;
                    if (childGrowValues) {
                        growValuesSum += childGrowValues[j];
                    } else {
                        growValuesSum += 1;
                    }
                }
                for (let j = 0; j < (floatyItems[childItem as string] as IFloatyColumnOrRow).items.length; j++) {
                    let childGrowValue;
                    const childGrowValues = (floatyItems[childItem as string] as IFloatyColumnOrRow).growValues;
                    if (childGrowValues) {
                        childGrowValue = childGrowValues[j];
                    } else {
                        childGrowValue = 1;
                    }
                    items.push((floatyItems[childItem as string] as IFloatyColumnOrRow).items[j]);
                    growValues.push(growValue * childGrowValue / growValuesSum);
                }
            } else {
                items.push(childItem);
                growValues.push(growValue);
            }
        }
    }
    if (items.length >= 2) {
        floatyItems[itemId] = {...self, items, growValues} as IFloatyColumnOrRow;
        return itemId;
    } else if (items.length === 1) {
        return items[0];
    }
}

function minimizeStack(itemId: string, floatyItems: IFloatyItems, minimized: {[key: string]: string | undefined}): string | undefined {
    const items = [];
    const titles = [];
    const self = floatyItems[itemId] as IFloatyStack;
    for (let i = 0; i < self.items.length; i++) {
        const child = self.items[i];
        const childItem = minimize(child, floatyItems, minimized);
        const title = self.titles[i];
        const titleItem = minimize(title, floatyItems, minimized);
        if (childItem !== undefined && titleItem !== undefined) {
            items.push(childItem);
            titles.push(titleItem);
        }
    }
    if (items.length >= 1) {
        floatyItems[itemId] = {...self, active: self.active, items, titles} as IFloatyStack;
        return itemId;
    }
}

function minimize(item: string, floatyItems: IFloatyItems, minimized: {[key: string]: string | undefined}): string | undefined {
    if (!(item in minimized)) {
        switch (floatyItems[item].type) {
            case 'column':
                minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'column');
                break;
            case 'row':
                minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'row');
                break;
            case 'stack':
                minimized[item] = minimizeStack(item, floatyItems, minimized);
                break;
            default:
                minimized[item] = item;
        }
    }
    return minimized[item];
}

function columnOrRow(state: IFloatyColumnOrRow, action: Redux.Action): IFloatyColumnOrRow {
    switch (action.type) {
        case FLOATY_SET_GROW_VALUES:
            return {...state, growValues: (action as IFloatySetGrowValues).growValues} as IFloatyColumnOrRow;
        default:
            return state;
    }
}

function stack(state: IFloatyStack = {type: 'stack', active: 0, titles: [], items: []}, action: Redux.Action): IFloatyStack {
    switch (action.type) {
        case FLOATY_REMOVE_TAB: {
            const items = state.items.slice();
            items.splice((action as IFloatyRemoveTab).index, 1);
            const titles: Array<any> = state.titles.slice();
            titles.splice((action as IFloatyRemoveTab).index, 1);
            if (state.active !== undefined) {
                // Ensure active index is in range
                const active = Math.min(items.length - 1, state.active);
                return {...state, active, items, titles} as IFloatyStack;
            } else {
                return {...state, items, titles} as IFloatyStack;
            }
        }
        case FLOATY_REMOVE_ACTIVE_TAB: {
            const items = state.items.slice();
            items.splice(state.active, 1);
            const titles = state.titles.slice();
            titles.splice(state.active, 1);
            if (state.active !== undefined) {
                // Ensure active index is in range
                const active = Math.min(items.length - 1, state.active);
                return {...state, active, items, titles} as IFloatyStack;
            } else {
                return {...state, items, titles} as IFloatyStack;
            }
        }
        case FLOATY_INSERT_TAB: {
            const items = state.items.slice();
            items.splice((action as IFloatyInsertTab).index, 0, (action as IFloatyInsertTab).item);
            const titles = state.titles.slice();
            titles.splice((action as IFloatyInsertTab).index, 0, (action as IFloatyInsertTab).title);
            return {...state, items, titles} as IFloatyStack;
        }
        case FLOATY_ADD_TAB: {
            const items = [...state.items, (action as IFloatyAddTab).item];
            const titles = [...state.titles, (action as IFloatyAddTab).title];
            return {...state, active: items.length - 1, items, titles} as IFloatyStack;
        }
        case FLOATY_SET_ACTIVE_TAB:
            return {...state, active: (action as IFloatySetActiveTab).index} as IFloatyStack;
        default:
            return state;
    }
}

function floatyItem(state: IFloatyItem, action: Redux.Action): IFloatyItem {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
        case FLOATY_SET_ACTIVE_TAB:
            return stack(state as IFloatyStack, action);
        case FLOATY_TRANSFORM_INTO_COLUMN:
            return {type: 'column', items: (action as IFloatyTransformIntoColumnOrRowItems).items} as IFloatyColumnOrRow;
        case FLOATY_TRANSFORM_INTO_ROW:
            return {type: 'row', items: (action as IFloatyTransformIntoColumnOrRowItems).items} as IFloatyColumnOrRow;
        case FLOATY_SET_GROW_VALUES:
            return columnOrRow(state as IFloatyColumnOrRow, action);
        case FLOATY_ADD_ITEM:
            return (action as IFloatyAddItem).item;
        case FLOATY_SET_ITEM_STATE:
            return {...state, state: (action as IFloatySetItemState).state} as IFloatyItem;
        default:
            return state;
    }
}

function floatyItems(state: IFloatyItems = {}, action: Redux.Action): IFloatyItems {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
        case FLOATY_SET_ACTIVE_TAB:
        case FLOATY_SET_GROW_VALUES:
        case FLOATY_ADD_ITEM:
        case FLOATY_SET_ITEM_STATE:
            return {...state, [(action as IFloatySetItemState).itemId]: floatyItem(state[(action as IFloatySetItemState).itemId], action)};
        case FLOATY_TRANSFORM_INTO_COLUMN:
        case FLOATY_TRANSFORM_INTO_ROW: {
            const {itemId, newItemsBefore} = action as IFloatyTransformIntoColumnOrRow;
            const [id1, id2] = [(action as IFloatyTransformIntoColumnOrRow).newId1, (action as IFloatyTransformIntoColumnOrRow).newId2];
            if (newItemsBefore) {
                return {...state, [itemId]: floatyItem(state[itemId], {type: action.type, items: [id1, id2]} as IFloatyTransformIntoColumnOrRowItems), [id1]: (action as IFloatyTransformIntoColumnOrRow).item, [id2]: state[itemId]};
            } else {
                return {...state, [itemId]: floatyItem(state[itemId], {type: action.type, items: [id1, id2]} as IFloatyTransformIntoColumnOrRowItems), [id1]: state[itemId], [id2]: (action as IFloatyTransformIntoColumnOrRow).item};
            }
        }
        case FLOATY_SET_LAYOUT:
            return {...state, [(action as IFloatySetLayout).itemId]: (action as IFloatySetLayout).item};
        default:
            return state;
    }
}

function floatyLayout(state: IFloatyLayout = {item: '0', floatingItem: null, floatingTitle: null}, action: Redux.Action): IFloatyLayout {
    switch (action.type) {
        case FLOATY_START_FLOATING:
            return {...state, floatingItem: (action as IFloatyStartFloating).item, floatingTitle: (action as IFloatyStartFloating).title} as IFloatyLayout;
        case FLOATY_STOP_FLOATING:
            return {...state, floatingItem: null, floatingTitle: null} as IFloatyLayout;
        case FLOATY_SET_LAYOUT:
            return {...state, item: (action as IFloatySetLayout).itemId} as IFloatyLayout;
        default:
            return state;
    }
}

function floatyLayouts(state: IFloatyLayouts = {}, action: Redux.Action): IFloatyLayouts {
    switch (action.type) {
        case FLOATY_START_FLOATING:
        case FLOATY_STOP_FLOATING:
        case FLOATY_SET_LAYOUT:
            return {...state, [(action as IFloatySetLayout).layoutId]: floatyLayout(state[(action as IFloatySetLayout).layoutId], action)};
        default:
            return state;
    }
}

function sweep(items: {[key: string]: any}, marked: {[key: string]: boolean}) {
    for (const key of Object.keys(items)) {
        if (!(key in marked)) {
            delete items[key];
        }
    }
}

export default function floaty(state: IFloatyState = {items: {}, layouts: {}}, action: IFloatyActionWithMeta): IFloatyState {
    switch (action.type) {
        case FLOATY_SET_LAYOUT:
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
        case FLOATY_SET_ACTIVE_TAB:
        case FLOATY_SET_GROW_VALUES:
        case FLOATY_TRANSFORM_INTO_COLUMN:
        case FLOATY_TRANSFORM_INTO_ROW:
        case FLOATY_START_FLOATING:
        case FLOATY_STOP_FLOATING:
        case FLOATY_ADD_ITEM:
            const {items, layouts} = state;
            const next = {
                items: {...floatyItems(items, action)},
                layouts: {...floatyLayouts(layouts, action)}
            };
            const minimized = {};
            Object.keys(next.layouts).forEach(key => {
                const layout = next.layouts[key];
                const {item, floatingItem, floatingTitle} = layout;
                if (item !== undefined) {
                    layout.item = minimize(item, next.items, minimized);
                }
                if (floatingItem) {
                    layout.floatingItem = minimize(floatingItem, next.items, minimized) || null;
                }
                if (floatingTitle) {
                    layout.floatingTitle = minimize(floatingTitle, next.items, minimized) || null;
                }
            });
            if (action.meta && action.meta.floaty && action.meta.floaty.sweep === true) {
                sweep(next.items, minimized);
            }
            return next;
        default:
            return state;
    }
}

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
    FLOATY_SWEEP,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW
} from '../constants';
import {generateIdentifier} from '../identifiers';

export function setGrowValues(itemId, growValues) {
    return {
        type: FLOATY_SET_GROW_VALUES,
        itemId,
        growValues
    };
}

export function setActiveTab(itemId, index) {
    return {
        type: FLOATY_SET_ACTIVE_TAB,
        itemId,
        index
    };
}

export function removeTab(itemId, index) {
    return {
        type: FLOATY_REMOVE_TAB,
        itemId,
        index
    };
}

export function removeActiveTab(itemId) {
    return {
        type: FLOATY_REMOVE_ACTIVE_TAB,
        itemId
    };
}

export function insertTab(itemId, index, item, title) {
    return {
        type: FLOATY_INSERT_TAB,
        itemId,
        index,
        item,
        title
    };
}

export function addTab(itemId, item, title) {
    return {
        type: FLOATY_ADD_TAB,
        itemId,
        item,
        title
    };
}

export function transformIntoColumn(itemId, item, newItemsBefore, newId1 = generateIdentifier(), newId2 = generateIdentifier()) {
    return {
        type: FLOATY_TRANSFORM_INTO_COLUMN,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2
    };
}

export function transformIntoRow(itemId, item, newItemsBefore, newId1 = generateIdentifier(), newId2 = generateIdentifier()) {
    return {
        type: FLOATY_TRANSFORM_INTO_ROW,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2
    };
}

export function setLayout(layoutId, item, itemId = generateIdentifier()) {
    return {
        type: FLOATY_SET_LAYOUT,
        layoutId,
        item,
        itemId
    };
}

export function startFloating(layoutId, item, title) {
    return {
        type: FLOATY_START_FLOATING,
        layoutId,
        item,
        title
    };
}

export function stopFloating(layoutId) {
    return {
        type: FLOATY_STOP_FLOATING,
        layoutId
    };
}

export function sweep() {
    return {type: FLOATY_SWEEP};
}

export function addItem(itemId, item) {
    return {
        type: FLOATY_ADD_ITEM,
        itemId,
        item
    };
}

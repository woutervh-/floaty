import {
    FLOATY_ADD_TAB,
    FLOATY_INSERT_TAB,
    FLOATY_NO_OPERATION,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_LAYOUT,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW,
    FLOATY_UPDATE_ACTIVE_TAB,
    FLOATY_UPDATE_COLUMN,
    FLOATY_UPDATE_COLUMN_ITEM,
    FLOATY_UPDATE_GENERIC,
    FLOATY_UPDATE_GROW_VALUES,
    FLOATY_UPDATE_ROW,
    FLOATY_UPDATE_ROW_ITEM,
    FLOATY_UPDATE_STACK,
    FLOATY_UPDATE_STACK_ITEM
} from '../constants';

export function updateGrowValues(growValues) {
    return {
        type: FLOATY_UPDATE_GROW_VALUES,
        growValues
    };
}

export function updateRow(update) {
    return {
        type: FLOATY_UPDATE_ROW,
        update
    };
}

export function updateRowItem(index, update) {
    return {
        type: FLOATY_UPDATE_ROW_ITEM,
        index,
        update
    };
}

export function updateColumn(update) {
    return {
        type: FLOATY_UPDATE_COLUMN,
        update
    };
}

export function updateColumnItem(index, update) {
    return {
        type: FLOATY_UPDATE_COLUMN_ITEM,
        index,
        update
    };
}

export function updateGeneric(update) {
    return {
        type: FLOATY_UPDATE_GENERIC,
        update
    };
}

export function updateActiveTab(index) {
    return {
        type: FLOATY_UPDATE_ACTIVE_TAB,
        index
    };
}

export function removeTab(index) {
    return {
        type: FLOATY_REMOVE_TAB,
        index
    };
}

export function removeActiveTab() {
    return  {type: FLOATY_REMOVE_ACTIVE_TAB};
}

export function insertTab(index, item, title) {
    return {
        type: FLOATY_INSERT_TAB,
        index,
        item,
        title
    };
}

export function addTab(item, title) {
    return {
        type: FLOATY_ADD_TAB,
        item,
        title
    };
}

export function updateStack(update) {
    return {
        type: FLOATY_UPDATE_STACK,
        update
    };
}

export function updateStackItem(index, update) {
    return {
        type: FLOATY_UPDATE_STACK_ITEM,
        index,
        update
    };
}

export function noOperation() {
    return {type: FLOATY_NO_OPERATION};
}

export function transformIntoRow(items, newItemsBefore) {
    return {
        type: FLOATY_TRANSFORM_INTO_ROW,
        items,
        newItemsBefore
    };
}

export function transformIntoColumn(items, newItemsBefore) {
    return {
        type: FLOATY_TRANSFORM_INTO_COLUMN,
        items,
        newItemsBefore
    };
}

export function setLayout(layout) {
    return {
        type: FLOATY_SET_LAYOUT,
        layout
    };
}

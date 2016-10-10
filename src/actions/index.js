import {
    FLOATY_ADD_TAB,
    FLOATY_INSERT_TAB,
    FLOATY_NO_OPERATION,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_ACTIVE_TAB,
    FLOATY_SET_LAYOUT,
    FLOATY_SET_STATE_FROM_REDUCER,
    FLOATY_START_FLOATING,
    FLOATY_STOP_FLOATING,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW
} from '../constants';

export function setActiveTab(index) {
    return {
        type: FLOATY_SET_ACTIVE_TAB,
        index
    };
}

export function removeTab(stackId, index) {
    return {
        type: FLOATY_REMOVE_TAB,
        stackId,
        index
    };
}

export function removeActiveTab() {
    return {type: FLOATY_REMOVE_ACTIVE_TAB};
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

export function noOperation() {
    return {type: FLOATY_NO_OPERATION};
}

export function transformIntoColumn(itemId, item, newItemsBefore) {
    return {
        type: FLOATY_TRANSFORM_INTO_COLUMN,
        itemId,
        item,
        newItemsBefore
    };
}

export function transformIntoRow(itemId, item, newItemsBefore) {
    return {
        type: FLOATY_TRANSFORM_INTO_ROW,
        itemId,
        item,
        newItemsBefore
    };
}

export function setLayout(layout) {
    return {
        type: FLOATY_SET_LAYOUT,
        layout
    };
}

export function setStateFromReducer(reducer, update) {
    return {
        type: FLOATY_SET_STATE_FROM_REDUCER,
        reducer,
        update
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

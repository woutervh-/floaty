import {UPDATE_ACTIVE_TAB, UPDATE_GENERIC, UPDATE_GROW_VALUES, UPDATE_ROW, UPDATE_ROW_ITEM, UPDATE_STACK, UPDATE_STACK_ITEM} from '../constants';

export function updateGrowValues(growValues) {
    return {
        type: UPDATE_GROW_VALUES,
        growValues
    };
}

export function updateRow(update) {
    return {
        type: UPDATE_ROW,
        update
    };
}

export function updateRowItem(index, update) {
    return {
        type: UPDATE_ROW_ITEM,
        index,
        update
    };
}

export function updateGeneric(update) {
    return {
        type: UPDATE_GENERIC,
        update
    };
}

export function updateActiveTab(index) {
    return {
        type: UPDATE_ACTIVE_TAB,
        index
    };
}

export function updateStack(update) {
    return {
        type: UPDATE_STACK,
        update
    };
}

export function updateStackItem(index, update) {
    return {
        type: UPDATE_STACK_ITEM,
        index,
        update
    };
}

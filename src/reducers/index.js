import {
    INSERT_TAB,
    REMOVE_TAB,
    TRANSFORM_INTO_COLUMN,
    TRANSFORM_INTO_ROW,
    UPDATE_ACTIVE_TAB,
    UPDATE_COLUMN,
    UPDATE_COLUMN_ITEM,
    UPDATE_GENERIC,
    UPDATE_GROW_VALUES,
    UPDATE_ROW,
    UPDATE_ROW_ITEM,
    UPDATE_STACK,
    UPDATE_STACK_ITEM
} from '../constants';
import {minimizeColumn, minimizeRow, minimizeStack, transformToColumn, transformToRow} from './LayoutUtil';

function column(state, action) {
    switch (action.type) {
        case UPDATE_GROW_VALUES:
            return {...state, growValues: action.growValues};
        case UPDATE_COLUMN_ITEM:
            const items = [...state.items];
            items[action.index] = columnItem(items[action.index], action.update);
            return {...state, items};
        default:
            return state;
    }
}

function row(state, action) {
    switch (action.type) {
        case UPDATE_GROW_VALUES:
            return {...state, growValues: action.growValues};
        case UPDATE_ROW_ITEM:
            const items = [...state.items];
            items[action.index] = rowItem(items[action.index], action.update);
            return {...state, items};
        default:
            return state;
    }
}

function columnItem(state, action) {
    switch (action.type) {
        case UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function rowItem(state, action) {
    switch (action.type) {
        case UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function stack(state, action) {
    switch (action.type) {
        case UPDATE_ACTIVE_TAB:
            return {...state, active: action.index};
        case UPDATE_STACK_ITEM: {
            const items = [...state.items];
            items[action.index] = stackItem(items[action.index], action.update);
            return {...state, items};
        }
        case REMOVE_TAB: {
            const items = [...state.items];
            items.splice(action.index, 1);
            const names = [...state.names];
            names.splice(action.index, 1);
            if ('active' in state) {
                // Ensure active index is in range
                const active = Math.min(items.length - 1, state.active);
                return {...state, active, items, names};
            } else {
                return {...state, items, names};
            }
        }
        case INSERT_TAB: {
            const items = [...state.items];
            items.splice(action.index, 0, action.item);
            const names = [...state.names];
            names.splice(action.index, 0, action.name)
            return {...state, items, names};
        }
        case TRANSFORM_INTO_ROW:
            return transformToRow(state, action.items, action.newItemsBefore);
        case TRANSFORM_INTO_COLUMN:
            return transformToColumn(state, action.items, action.newItemsBefore);
        default:
            return state;
    }
}

function stackItem(state, action) {
    switch (action.type) {
        case UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function component(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function generic(state, action) {
    switch (action.type) {
        case TRANSFORM_INTO_COLUMN:
            return transformToColumn(state, action.items, action.newItemsBefore);
        case TRANSFORM_INTO_ROW:
            return transformToRow(state, action.items, action.newItemsBefore);
        case UPDATE_COLUMN:
            return minimizeColumn(column(state, action.update));
        case UPDATE_ROW:
            return minimizeRow(row(state, action.update));
        case UPDATE_STACK:
            return minimizeStack(stack(state, action.update));
        default:
            return component(state, action);
    }
}

export default function floaty(state, action) {
    return generic(state, action) || {};
};

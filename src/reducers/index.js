import {
    FLOATY_ADD_TAB,
    FLOATY_INSERT_TAB,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_LAYOUT,
    FLOATY_SET_STATE,
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
import {minimizeColumn, minimizeRow, minimizeStack, transformToColumn, transformToRow} from './LayoutUtil';

function column(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_GROW_VALUES:
            return {...state, growValues: action.growValues};
        case FLOATY_UPDATE_COLUMN_ITEM:
            const items = [...state.items];
            items[action.index] = columnItem(items[action.index], action.update);
            return {...state, items};
        default:
            return state;
    }
}

function row(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_GROW_VALUES:
            return {...state, growValues: action.growValues};
        case FLOATY_UPDATE_ROW_ITEM:
            const items = [...state.items];
            items[action.index] = rowItem(items[action.index], action.update);
            return {...state, items};
        default:
            return state;
    }
}

function columnItem(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function rowItem(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function stack(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_ACTIVE_TAB:
            return {...state, active: action.index};
        case FLOATY_UPDATE_STACK_ITEM: {
            const items = [...state.items];
            items[action.index] = stackItem(items[action.index], action.update);
            return {...state, items};
        }
        case FLOATY_REMOVE_TAB: {
            const items = [...state.items];
            items.splice(action.index, 1);
            const titles = [...state.titles];
            titles.splice(action.index, 1);
            if ('active' in state) {
                // Ensure active index is in range
                const active = Math.min(items.length - 1, state.active);
                return {...state, active, items, titles};
            } else {
                return {...state, items, titles};
            }
        }
        case FLOATY_REMOVE_ACTIVE_TAB: {
            const items = [...state.items];
            items.splice(state.active, 1);
            const titles = [...state.titles];
            titles.splice(state.active, 1);
            if ('active' in state) {
                // Ensure active index is in range
                const active = Math.min(items.length - 1, state.active);
                return {...state, active, items, titles};
            } else {
                return {...state, items, titles};
            }
        }
        case FLOATY_INSERT_TAB: {
            const items = [...state.items];
            items.splice(action.index, 0, action.item);
            const titles = [...state.titles];
            titles.splice(action.index, 0, action.title);
            return {...state, items, titles};
        }
        case FLOATY_ADD_TAB: {
            const items = [...state.items, action.item];
            const titles = [...state.titles, action.title];
            return {...state, active: items.length - 1, items, titles};
        }
        case FLOATY_TRANSFORM_INTO_ROW:
            return transformToRow(state, action.items, action.newItemsBefore);
        case FLOATY_TRANSFORM_INTO_COLUMN:
            return transformToColumn(state, action.items, action.newItemsBefore);
        default:
            return state;
    }
}

function stackItem(state, action) {
    switch (action.type) {
        case FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function generic(state, action) {
    switch (action.type) {
        case FLOATY_TRANSFORM_INTO_COLUMN:
            return transformToColumn(state, action.items, action.newItemsBefore);
        case FLOATY_TRANSFORM_INTO_ROW:
            return transformToRow(state, action.items, action.newItemsBefore);
        case FLOATY_UPDATE_COLUMN:
            return minimizeColumn(column(state, action.update));
        case FLOATY_UPDATE_ROW:
            return minimizeRow(row(state, action.update));
        case FLOATY_UPDATE_STACK:
            return minimizeStack(stack(state, action.update));
        case FLOATY_SET_LAYOUT:
            return action.layout;
        case FLOATY_SET_STATE:
            return {...state, state: action.state};
        default:
            return state;
    }
}

export default function floaty(state, action) {
    return generic(state, action) || {type: 'component', content: ''};
};

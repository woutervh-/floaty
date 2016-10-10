import {
    FLOATY_ADD_TAB,
    FLOATY_INSERT_TAB,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_LAYOUT,
    FLOATY_SET_STATE_FROM_REDUCER,
    FLOATY_START_FLOATING,
    FLOATY_STOP_FLOATING,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW
} from '../constants';
import {minimizeColumn, minimizeRow, minimizeStack} from './LayoutUtil';

function column(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function row(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function stack(state = {active: 0, titles: [], items: []}, action) {
    switch (action.type) {
        case FLOATY_REMOVE_TAB: {
            const items = [...state.items];
            items.splice(action.index, 1);
            const titles = [...state.titles];
            titles.splice(action.index, 1);
            if (typeof state.active !== 'undefined') {
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
            if (typeof state.active !== 'undefined') {
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
        default:
            return state;
    }
}

// function generic(state, action) {
//     switch (action.type) {
//         case FLOATY_TRANSFORM_INTO_COLUMN:
//             return transformToColumn(state, action.items, action.newItemsBefore);
//         case FLOATY_TRANSFORM_INTO_ROW:
//             return transformToRow(state, action.items, action.newItemsBefore);
//         case FLOATY_SET_LAYOUT:
//             return action.layout;
//         case FLOATY_SET_STATE_FROM_REDUCER:
//             return {...state, state: action.reducer(state.state, action.update)};
//         default:
//             return state;
//     }
// }

function floatyItem(state = {}, action) {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
            return stack(state, action);
        case FLOATY_TRANSFORM_INTO_COLUMN:
            return {type: 'column', items: action.items};
        case FLOATY_TRANSFORM_INTO_ROW:
            return {type: 'row', items: action.items};
        default:
            return state;
    }
}

function floatyItems(state = [], action) {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB: {
            const items = [...state];
            items[action.stackId] = floatyItem(state[action.stackId], action);
            return items;
        }
        case FLOATY_TRANSFORM_INTO_COLUMN:
        case FLOATY_TRANSFORM_INTO_ROW: {
            const {itemId, newItemsBefore} = action;
            const items = [...state, state[itemId], action.item];
            if (newItemsBefore) {
                items[action.itemId] = floatyItem(state[itemId], {type: action.type, items: [items.length - 1, items.length - 2]});
            } else {
                items[action.itemId] = floatyItem(state[itemId], {type: action.type, items: [items.length - 2, items.length - 1]});
            }
            return items;
        }
        default:
            return state;
    }
}

function floatyLayout(state = {item: 0, floatingItem: null, floatingTitle: null}, action) {
    switch (action.type) {
        case FLOATY_START_FLOATING:
            return {...state, floatingItem: action.item, floatingTitle: action.title};
        case FLOATY_STOP_FLOATING:
            return {...state, floatingItem: null, floatingTitle: null};
        default:
            return state;
    }
}

function floatyLayouts(state = [], action) {
    switch (action.type) {
        case FLOATY_START_FLOATING:
        case FLOATY_STOP_FLOATING:
            const layouts = [...state];
            layouts[action.layoutId] = floatyLayout(layouts[action.layoutId], action);
            return layouts;
        default:
            return state;
    }
}

export default function floaty(state = {}, action) {
    const {entities = {}} = state;
    const {floatyItems: items, floatyLayouts: layouts} = entities;
    return {...state, entities: {...entities, floatyItems: floatyItems(items, action), floatyLayouts: floatyLayouts(layouts, action)}};
}

// TODO: minimization & cleanup

// export default function floaty(state, action) {
//     return generic(state, action) || {type: 'component', content: ''};
// };

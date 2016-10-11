import {
    FLOATY_ADD_TAB,
    FLOATY_INSERT_TAB,
    FLOATY_REMOVE_ACTIVE_TAB,
    FLOATY_REMOVE_TAB,
    FLOATY_SET_ACTIVE_TAB,
    FLOATY_SET_GROW_VALUES,
    FLOATY_START_FLOATING,
    FLOATY_STOP_FLOATING,
    FLOATY_TRANSFORM_INTO_COLUMN,
    FLOATY_TRANSFORM_INTO_ROW
} from '../constants';
import {generateIdentifier, isReference} from '../references';

function minimizeColumnOrRow(itemId, floatyItems, minimized, type) {
    const items = [];
    const growValues = [];
    const self = floatyItems[itemId];
    for (let i = 0; i < self.items.length; i++) {
        const child = self.items[i];
        const childItem = minimize(child, floatyItems, minimized);
        if (childItem) {
            const growValue = self.growValues && self.growValues[i] || 1;
            if (isReference(childItem) && floatyItems[childItem].type === type) {
                let growValuesSum = 0;
                for (let j = 0; j < floatyItems[childItem].items.length; j++) {
                    growValuesSum += floatyItems[childItem].growValues && floatyItems[childItem].growValues[j] || 1;
                }
                for (let j = 0; j < floatyItems[childItem].items.length; j++) {
                    const childGrowValue = floatyItems[childItem].growValues && floatyItems[childItem].growValues[j] || 1;
                    items.push(floatyItems[childItem].items[j]);
                    growValues.push(growValue * childGrowValue / growValuesSum);
                }
            } else {
                items.push(childItem);
                growValues.push(growValue);
            }
        }
    }
    if (items.length >= 2) {
        floatyItems[itemId] = {...floatyItems[itemId], items, growValues};
        return itemId;
    } else if (items.length === 1) {
        return items[0];
    }
}

function minimizeStack(itemId, floatyItems, minimized) {
    const items = [];
    const titles = [];
    const self = floatyItems[itemId];
    for (let i = 0; i < self.items.length; i++) {
        const child = self.items[i];
        const childItem = minimize(child, floatyItems, minimized);
        if (childItem) {
            items.push(childItem);
            titles.push(self.titles[i]);
        }
    }
    if (items.length >= 1) {
        floatyItems[itemId] = {...floatyItems[itemId], items, titles};
        return itemId;
    }
}

function minimize(item, floatyItems, minimized) {
    if (isReference(item)) {
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
    } else {
        return item;
    }
}

function columnOrRow(state, action) {
    switch (action.type) {
        case FLOATY_SET_GROW_VALUES:
            return {...state, growValues: action.growValues};
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
        case FLOATY_SET_ACTIVE_TAB:
            return {...state, active: action.index};
        default:
            return state;
    }
}

function floatyItem(state = {}, action) {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
        case FLOATY_SET_ACTIVE_TAB:
            return stack(state, action);
        case FLOATY_TRANSFORM_INTO_COLUMN:
            return {type: 'column', items: action.items};
        case FLOATY_TRANSFORM_INTO_ROW:
            return {type: 'row', items: action.items};
        case FLOATY_SET_GROW_VALUES:
            return columnOrRow(state, action);
        default:
            return state;
    }
}

function floatyItems(state = {}, action) {
    switch (action.type) {
        case FLOATY_REMOVE_TAB:
        case FLOATY_REMOVE_ACTIVE_TAB:
        case FLOATY_INSERT_TAB:
        case FLOATY_ADD_TAB:
        case FLOATY_SET_ACTIVE_TAB:
        case FLOATY_SET_GROW_VALUES:
            return {...state, [action.itemId]: floatyItem(state[action.itemId], action)};
        case FLOATY_TRANSFORM_INTO_COLUMN:
        case FLOATY_TRANSFORM_INTO_ROW: {
            const {itemId, newItemsBefore} = action;
            const [id1, id2] = [generateIdentifier(), generateIdentifier()];
            if (newItemsBefore) {
                return {...state, [itemId]: floatyItem(state[itemId], {type: action.type, items: [id1, id2]}), [id1]: action.item, [id2]: state[itemId]};
            } else {
                return {...state, [itemId]: floatyItem(state[itemId], {type: action.type, items: [id1, id2]}), [id1]: state[itemId], [id2]: action.item};
            }
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

function floatyLayouts(state = {}, action) {
    switch (action.type) {
        case FLOATY_START_FLOATING:
        case FLOATY_STOP_FLOATING:
            return {...state, [action.layoutId]: floatyLayout(state[action.layoutId], action)};
        default:
            return state;
    }
}

export default function floaty(state = {}, action) {
    const {entities = {}} = state;
    const {floatyItems: items, floatyLayouts: layouts} = entities;
    const next = {...state, entities: {...entities, floatyItems: {...floatyItems(items, action)}, floatyLayouts: {...floatyLayouts(layouts, action)}}};
    const minimized = {};
    Object.keys(next.entities.floatyLayouts).forEach(key => {
        const {item, floatingItem} = next.entities.floatyLayouts[key];
        next.entities.floatyLayouts[key].item = minimize(item, next.entities.floatyItems, minimized);
        next.entities.floatyLayouts[key].floatingItem = minimize(floatingItem, next.entities.floatyItems, minimized);
    });
    return next;
}

// TODO: minimization & cleanup

// export default function floaty(state, action) {
//     return generic(state, action) || {type: 'component', content: ''};
// };

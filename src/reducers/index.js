import {REMOVE_TAB, SET_PROP, UPDATE_GENERIC, UPDATE_GROW_VALUES, UPDATE_ROW, UPDATE_ROW_ITEM, UPDATE_STACK, UPDATE_STACK_ITEM, UPDATE_ACTIVE_TAB} from '../constants';

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
            return {...state, items, names};
        }
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
        case SET_PROP:
            return {...state, props: {...state.props, [action.key]: action.value}};
        case UPDATE_ROW:
            return row(state, action.update);
        case UPDATE_STACK:
            return stack(state, action.update);
        default:
            return component(state, action);
    }
}

export default generic;

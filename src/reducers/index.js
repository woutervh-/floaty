import {RESIZE_GROW_VALUES, SET_LAYOUT} from '../constants';

export function row(state = [], action) {
    switch (action.type) {
        case RESIZE_GROW_VALUES:
            const growValues = [];
            for (let i = 0; i < length; i++) {
                growValues.push(i < state.length ? state[i] : 1);
            }
            return growValues;
        default:
            return state;
    }
}

export function rowSeparator(state = 0, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function layout(state = {content: ''}, action) {
    switch (action.type) {
        case SET_LAYOUT:
            return action.layout;
        default:
            return state;
    }
}

export function drag(state = undefined, action) {
    switch (action.type) {
        default:
            return state;
    }
}

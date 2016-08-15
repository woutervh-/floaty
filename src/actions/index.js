import {SET_LAYOUT} from '../constants';

export function setLayout(layout) {
    return {
        type: SET_LAYOUT,
        layout
    };
}

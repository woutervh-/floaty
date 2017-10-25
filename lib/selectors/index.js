"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function floatySelector(state, props) {
    return {
        item: state.layouts[props.id].item,
        floatingItem: state.layouts[props.id].floatingItem,
        floatingTitle: state.layouts[props.id].floatingTitle,
        floaty: state,
        isFloating: state.layouts[props.id].floatingItem !== null && state.layouts[props.id].floatingItem !== undefined
    };
}
exports.floatySelector = floatySelector;
function itemSelector(state, props) {
    return state.items[props.id];
}
exports.itemSelector = itemSelector;
//# sourceMappingURL=index.js.map
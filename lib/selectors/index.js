"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function floatySelector(state, props) {
    return {
        item: state.floaty.layouts[props.id].item,
        floatingItem: state.floaty.layouts[props.id].floatingItem,
        floatingTitle: state.floaty.layouts[props.id].floatingTitle,
        floaty: state.floaty,
        isFloating: state.floaty.layouts[props.id].floatingItem !== null && state.floaty.layouts[props.id].floatingItem !== undefined
    };
}
exports.floatySelector = floatySelector;
function itemSelector(state, props) {
    return state.floaty.items[props.id];
}
exports.itemSelector = itemSelector;
//# sourceMappingURL=index.js.map
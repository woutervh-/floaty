export function floatySelector(state, props) {
    return {
        item: state.floaty.layouts[props.id].item,
        floatingItem: state.floaty.layouts[props.id].floatingItem,
        floatingTitle: state.floaty.layouts[props.id].floatingTitle,
        floaty: state.floaty,
        isFloating: state.floaty.layouts[props.id].floatingItem !== null && state.floaty.layouts[props.id].floatingItem !== undefined
    };
}
export function itemSelector(state, props) {
    return state.floaty.items[props.id];
}
//# sourceMappingURL=index.js.map
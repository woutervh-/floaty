export const floatySelector = (state, props) => ({
    ...state.floaty.layouts[props.id],
    floaty: state.floaty,
    isFloating: state.floaty.layouts[props.id].floatingItem !== null && state.floaty.layouts[props.id].floatingItem !== undefined
});

export const itemSelector = (state, props) => {
    const item = state.floaty.items[props.id];
    if (typeof item === 'object') {
        return item;
    } else {
        return {type: 'component', content: item};
    }
};

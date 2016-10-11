export const floatySelector = (state, props) => ({
    ...state.entities.floaty.layouts[props.id],
    isFloating: !!state.entities.floaty.layouts[props.id].floatingItem
});

export const itemSelector = (state, props) => {
    const item = state.entities.floaty.items[props.id];
    if (typeof item === 'object') {
        return item;
    } else {
        return {type: 'component', content: state};
    }
};

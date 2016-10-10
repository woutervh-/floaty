export const floatySelector = (state, props) => ({
    ...state.entities.floatyLayouts[props.id],
    isFloating: !!state.entities.floatyLayouts[props.id].floatingItem
});

export const itemSelector = (state, props) => {
    const item = state.entities.floatyItems[props.id];
    if (typeof item === 'object') {
        return item;
    } else {
        return {type: 'component', content: state};
    }
};

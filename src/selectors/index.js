export const itemSelector = (state, props) => typeof state === 'object' ? state.entities.floatyItems[props.id] : {type: 'component', content: state};

export const columnSelector = (state, props) => state.entities.floatyColumns[props.id];

export const rowSelector = (state, props) => state.entities.floatyRows[props.id];

export const stackSelector = (state, props) => state.entities.floatyStacks[props.id];

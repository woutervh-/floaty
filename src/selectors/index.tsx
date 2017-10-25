import {IFloatyState} from '../reducers/index';
import {IFloatyProps, IFloatySelectedProps} from '../Floaty';
import {IFloatyItemProps, IFloatyItemSelectedProps} from '../Item';

export function floatySelector(state: {floaty: IFloatyState}, props: IFloatyProps): IFloatySelectedProps {
    return {
        item: state.floaty.layouts[props.id].item,
        floatingItem: state.floaty.layouts[props.id].floatingItem,
        floatingTitle: state.floaty.layouts[props.id].floatingTitle,
        floaty: state.floaty,
        isFloating: state.floaty.layouts[props.id].floatingItem !== null && state.floaty.layouts[props.id].floatingItem !== undefined
    };
}

export function itemSelector(state: {floaty: IFloatyState}, props: IFloatyItemProps): IFloatyItemSelectedProps {
    return state.floaty.items[props.id];
}

import {IFloatyState} from '../reducers/index';
import {IFloatyProps, IFloatySelectedProps} from '../Floaty';
import {IFloatyItemProps, IFloatyItemSelectedProps} from '../Item';

export function floatySelector(state: IFloatyState, props: IFloatyProps): IFloatySelectedProps {
    return {
        item: state.layouts[props.id].item,
        floatingItem: state.layouts[props.id].floatingItem,
        floatingTitle: state.layouts[props.id].floatingTitle,
        floaty: state,
        isFloating: state.layouts[props.id].floatingItem !== null && state.layouts[props.id].floatingItem !== undefined
    };
}

export function itemSelector(state: IFloatyState, props: IFloatyItemProps): IFloatyItemSelectedProps {
    return state.items[props.id];
}

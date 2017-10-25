import { IFloatyState } from '../reducers/index';
import { IFloatyProps, IFloatySelectedProps } from '../Floaty';
import { IFloatyItemProps, IFloatyItemSelectedProps } from '../Item';
export declare function floatySelector(state: {
    floaty: IFloatyState;
}, props: IFloatyProps): IFloatySelectedProps;
export declare function itemSelector(state: {
    floaty: IFloatyState;
}, props: IFloatyItemProps): IFloatyItemSelectedProps;

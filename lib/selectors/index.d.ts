import { IFloatyState } from '../reducers/index';
import { IFloatyProps, IFloatySelectedProps } from '../Floaty';
import { IFloatyItemProps, IFloatyItemSelectedProps } from '../Item';
export declare function floatySelector(state: IFloatyState, props: IFloatyProps): IFloatySelectedProps;
export declare function itemSelector(state: IFloatyState, props: IFloatyItemProps): IFloatyItemSelectedProps;

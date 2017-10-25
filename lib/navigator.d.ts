import { IFloatyItems, IFloatyItem, IFloatyState } from './reducers/index';
export declare class BaseNavigator {
    _items: IFloatyItems;
    _id: string;
    _parent?: BaseNavigator;
    constructor(items: IFloatyItems, id: string, parent?: BaseNavigator);
    object(): IFloatyItem;
    parent(): BaseNavigator | undefined;
    id(): string;
    find(predicate: (navigator: BaseNavigator) => boolean): BaseNavigator | undefined;
    findAll(predicate: (navigator: BaseNavigator) => boolean, accumulator?: Array<BaseNavigator>): Array<BaseNavigator>;
    isLeafNode(): boolean;
}
export declare class ItemsNavigator extends BaseNavigator {
    items(): BaseNavigator[];
    item(index: number): BaseNavigator;
    find(predicate: (navigator: BaseNavigator) => boolean): BaseNavigator | undefined;
    findAll(predicate: (navigator: BaseNavigator) => boolean, accumulator?: Array<BaseNavigator>): Array<BaseNavigator>;
    isLeafNode(): boolean;
}
export declare class ColumnNavigator extends ItemsNavigator {
}
export declare class RowNavigator extends ItemsNavigator {
}
export declare class StackNavigator extends ItemsNavigator {
}
export declare class LeafObjectNavigator extends BaseNavigator {
}
export default function navigator(floaty: IFloatyState, layoutId?: string): BaseNavigator | undefined;

import {IFloatyItems, IFloatyItem, IFloatyNodeItem, IFloatyState} from './reducers/index';

function createNavigator(items: IFloatyItems, id: string, parent?: BaseNavigator): BaseNavigator {
    switch (items[id].type) {
        case 'column':
            return new ColumnNavigator(items, id, parent);
        case 'row':
            return new RowNavigator(items, id, parent);
        case 'stack':
            return new StackNavigator(items, id, parent);
        case 'prop-ref':
        case 'component':
            return new LeafObjectNavigator(items, id, parent);
        default:
            throw new Error('Unsupported type: ' + items[id].type);
    }
}

export class BaseNavigator {
    _items: IFloatyItems;
    _id: string;
    _parent?: BaseNavigator;

    constructor(items: IFloatyItems, id: string, parent?: BaseNavigator) {
        this._items = items;
        this._id = id;
        this._parent = parent;
    }

    object(): IFloatyItem {
        return this._items[this._id];
    }

    parent(): BaseNavigator | undefined {
        return this._parent;
    }

    id(): string {
        return this._id;
    }

    find(predicate: (navigator: BaseNavigator) => boolean): BaseNavigator | undefined {
        if (predicate(this)) {
            return this;
        }
    }

    findAll(predicate: (navigator: BaseNavigator) => boolean, accumulator: Array<BaseNavigator> = []): Array<BaseNavigator> {
        if (predicate(this)) {
            accumulator.push(this);
        }
        return accumulator;
    }

    isLeafNode(): boolean {
        return true;
    }
}

export class ItemsNavigator extends BaseNavigator {
    items() {
        return (this._items[this._id] as IFloatyNodeItem).items.map(item => createNavigator(this._items, item, this));
    }

    item(index: number) {
        return createNavigator(this._items, (this._items[this._id] as IFloatyNodeItem).items[index], this);
    }

    find(predicate: (navigator: BaseNavigator) => boolean): BaseNavigator | undefined {
        for (const item of this.items()) {
            const result = item.find(predicate);
            if (result) {
                return result;
            }
        }
        return super.find(predicate);
    }

    findAll(predicate: (navigator: BaseNavigator) => boolean, accumulator: Array<BaseNavigator> = []): Array<BaseNavigator> {
        for (const item of this.items()) {
            item.findAll(predicate, accumulator);
        }
        super.findAll(predicate, accumulator);
        return accumulator;
    }

    isLeafNode(): boolean {
        return false;
    }
}

export class ColumnNavigator extends ItemsNavigator {
}

export class RowNavigator extends ItemsNavigator {
}

export class StackNavigator extends ItemsNavigator {
}

export class LeafObjectNavigator extends BaseNavigator {
}

export default function navigator(floaty: IFloatyState, layoutId: string = '0') {
    const item = floaty.layouts[layoutId].item;
    if (item !== undefined) {
        return createNavigator(floaty.items, item, undefined);
    }
}

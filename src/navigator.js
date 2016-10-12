function createNavigator(items, id, parent) {
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

class BaseNavigator {
    constructor(items, id, parent) {
        this._items = items;
        this._id = id;
        this._parent = parent;
    }

    object() {
        return this._items[this._id];
    }

    parent() {
        return this._parent;
    }

    id() {
        return this._id;
    }

    find(predicate) {
        if (predicate(this)) {
            return this;
        }
    }
}

class ItemsNavigator extends BaseNavigator {
    items() {
        return this._items[this._id].items.map(item => createNavigator(this._items, item, this));
    }

    item(index) {
        return createNavigator(this._items, this._items[this._id].items[index], this);
    }

    find(predicate) {
        for (const item of this.items()) {
            const result = item.find(predicate);
            if (result) {
                return result;
            }
        }
        return super.find(predicate);
    }
}

class ColumnNavigator extends ItemsNavigator {
}

class RowNavigator extends ItemsNavigator {
}

class StackNavigator extends ItemsNavigator {
}

class LeafObjectNavigator extends BaseNavigator {
}

export default function navigator(floaty, layoutId) {
    return createNavigator(floaty.items, floaty.layouts[layoutId].item, null);
}

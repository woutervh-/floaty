function createNavigator(object, parent) {
    switch (object.type) {
        case 'column':
            return new ColumnNavigator(object, parent);
        case 'row':
            return new RowNavigator(object, parent);
        case 'stack':
            return new StackNavigator(object, parent);
        case 'prop-ref':
        case 'child-ref':
        case 'component':
            return new LeafObjectNavigator(object, parent);
        default:
            throw new Error('Unsupported type: ' + object.type);
    }
}

class BaseNavigator {
    constructor(object, parent) {
        this._object = object;
        this._parent = parent;
    }

    object() {
        return this._object;
    }

    parent() {
        return this._parent;
    }

    find(predicate) {
        if (predicate(this._object)) {
            return this;
        }
    }
}

class ItemsNavigator extends BaseNavigator {
    items() {
        return this._object.items.map(item => createNavigator(item, this));
    }

    item(index) {
        return createNavigator(this._object.items[index], this);
    }

    find(predicate) {
        for (const item of this.items()) {
            const result = item.find(predicate);
            if (result) {
                return result;
            }
        }
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

export default function navigator(state) {
    return createNavigator(state, null);
}

import {updateColumn, updateColumnItem, updateGeneric, updateRow, updateRowItem, updateStack, updateStackItem} from './actions';

function createNavigator(object, parent, chained) {
    switch (object.type) {
        case 'column':
            return new ColumnNavigator(object, parent, action => chained(updateColumn(action)));
        case 'row':
            return new RowNavigator(object, parent, action => chained(updateRow(action)));
        case 'stack':
            return new StackNavigator(object, parent, action => chained(updateStack(action)));
        case 'prop-ref':
        case 'child-ref':
        case 'component':
            return new LeafObjectNavigator(object, parent, action => chained(updateGeneric(action)));
        default:
            throw new Error('Unsupported type: ' + object.type);
    }
}

class BaseNavigator {
    constructor(object, parent, chained) {
        this._object = object;
        this._parent = parent;
        this._chained = chained;
    }

    object() {
        return this._object;
    }

    parent() {
        return this._parent;
    }

    chained(action) {
        return action ? this._chained(action) : this._chained;
    }

    find(predicate) {
        if (predicate(this._object)) {
            return this;
        }
    }
}

class ItemsNavigator extends BaseNavigator {
    items() {
        return this._object.items.map((item, index) => createNavigator(item, this, action => this.chained(this._chainItemAction()(index, updateGeneric(action)))));
    }

    item(index) {
        return createNavigator(this._object.items[index], this, action => this.chained(this._chainItemAction()(index, updateGeneric(action))));
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

    _chainItemAction() {
        throw new Error('Abstract method');
    }
}

class ColumnNavigator extends ItemsNavigator {
    _chainItemAction() {
        return updateColumnItem;
    }
}

class RowNavigator extends ItemsNavigator {
    _chainItemAction() {
        return updateRowItem;
    }
}

class StackNavigator extends ItemsNavigator {
    _chainItemAction() {
        return updateStackItem;
    }
}

class LeafObjectNavigator extends BaseNavigator {
}

export default function navigator(state) {
    return createNavigator(state, null, action => action);
}

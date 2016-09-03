import {removeTab, updateGeneric, updateRow, updateRowItem, updateColumn, updateColumnItem, updateStack, updateStackItem, setLayout} from './actions';

function createNavigator(parentNavigator, object) {
    switch (object.type) {
        case 'column':
            return new ColumnNavigator(parentNavigator, object);
        case 'row':
            return new RowNavigator(parentNavigator, object);
        case 'stack':
            return new StackNavigator(parentNavigator, object);
        default:
            return new LeafComponentNavigator(parentNavigator, object);
    }
}

class GenericNavigator {
    constructor(parent, object) {
        this._parent = parent;
        this._object = object;
    }

    get parent() {
        return this._parent;
    }

    get object() {
        return this._object;
    }

    get type() {
        throw new Error('Abstract method');
    }
}

class ItemsObjectNavigator extends GenericNavigator {
    items() {
        return this._object.items.map(object => createNavigator(this, object));
    }

    item(index) {
        return createNavigator(this._object.items[index]);
    }
}

class ColumnNavigator extends ItemsObjectNavigator {
    get type() {
        return 'column';
    }
}

class RowNavigator extends ItemsObjectNavigator {
    get type() {
        return 'row';
    }
}

class StackNavigator extends ItemsObjectNavigator {
    get type() {
        return 'stack';
    }

    addControl(control) {
        this.dispatch();
    }
}

class LeafComponentNavigator extends GenericNavigator {
    get type() {
        return 'component';
    }
}

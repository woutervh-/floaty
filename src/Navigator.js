function createNavigator(object, parent) {
    switch(object.type) {
        case 'column':
            return new ColumnNavigator(object, parent);
        case 'row':
            return new RowNavigator(object, parent);
        case 'stack':
            return new StackNavigator(object, parent);
        default:
            throw new Error('Leaf component navigator not implemented yet');
    }
}

class BaseNavigator {
    constructor(object, parent) {
        this._object = object;
        this._parent = parent;
    }

    type() {
        throw new Error('Abstract method');
    }

    dispatcher() {
        throw new Error('Abstract method');
    }

    object(){
        return this._object;
    }

    parent() {
        return this._parent;
    }
}

class ItemsNavigator extends BaseNavigator {
    items() {
        return this._object.items.map(item => createNavigator(item, this));
    }

    item(index) {
        return createNavigator(this._object.items[index], this);
    }
}

class ColumnNavigator extends ItemsNavigator {
    type() {
        return 'column';
    }
}

class RowNavigator extends ItemsNavigator {
    type() {
        return 'row';
    }
}

class StackNavigator extends ItemsNavigator {
    type() {
        return 'stack';
    }
}

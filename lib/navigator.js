"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    findAll(predicate, accumulator = []) {
        if (predicate(this)) {
            accumulator.push(this);
        }
        return accumulator;
    }
    isLeafNode() {
        return true;
    }
}
exports.BaseNavigator = BaseNavigator;
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
    findAll(predicate, accumulator = []) {
        for (const item of this.items()) {
            item.findAll(predicate, accumulator);
        }
        super.findAll(predicate, accumulator);
        return accumulator;
    }
    isLeafNode() {
        return false;
    }
}
exports.ItemsNavigator = ItemsNavigator;
class ColumnNavigator extends ItemsNavigator {
}
exports.ColumnNavigator = ColumnNavigator;
class RowNavigator extends ItemsNavigator {
}
exports.RowNavigator = RowNavigator;
class StackNavigator extends ItemsNavigator {
}
exports.StackNavigator = StackNavigator;
class LeafObjectNavigator extends BaseNavigator {
}
exports.LeafObjectNavigator = LeafObjectNavigator;
function navigator(floaty, layoutId = '0') {
    const item = floaty.layouts[layoutId].item;
    if (item !== undefined) {
        return createNavigator(floaty.items, item, undefined);
    }
}
exports.default = navigator;
//# sourceMappingURL=navigator.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var BaseNavigator = /** @class */ (function () {
    function BaseNavigator(items, id, parent) {
        this._items = items;
        this._id = id;
        this._parent = parent;
    }
    BaseNavigator.prototype.object = function () {
        return this._items[this._id];
    };
    BaseNavigator.prototype.parent = function () {
        return this._parent;
    };
    BaseNavigator.prototype.id = function () {
        return this._id;
    };
    BaseNavigator.prototype.find = function (predicate) {
        if (predicate(this)) {
            return this;
        }
    };
    BaseNavigator.prototype.findAll = function (predicate, accumulator) {
        if (accumulator === void 0) { accumulator = []; }
        if (predicate(this)) {
            accumulator.push(this);
        }
        return accumulator;
    };
    BaseNavigator.prototype.isLeafNode = function () {
        return true;
    };
    return BaseNavigator;
}());
exports.BaseNavigator = BaseNavigator;
var ItemsNavigator = /** @class */ (function (_super) {
    __extends(ItemsNavigator, _super);
    function ItemsNavigator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemsNavigator.prototype.items = function () {
        var _this = this;
        return this._items[this._id].items.map(function (item) { return createNavigator(_this._items, item, _this); });
    };
    ItemsNavigator.prototype.item = function (index) {
        return createNavigator(this._items, this._items[this._id].items[index], this);
    };
    ItemsNavigator.prototype.find = function (predicate) {
        for (var _i = 0, _a = this.items(); _i < _a.length; _i++) {
            var item = _a[_i];
            var result = item.find(predicate);
            if (result) {
                return result;
            }
        }
        return _super.prototype.find.call(this, predicate);
    };
    ItemsNavigator.prototype.findAll = function (predicate, accumulator) {
        if (accumulator === void 0) { accumulator = []; }
        for (var _i = 0, _a = this.items(); _i < _a.length; _i++) {
            var item = _a[_i];
            item.findAll(predicate, accumulator);
        }
        _super.prototype.findAll.call(this, predicate, accumulator);
        return accumulator;
    };
    ItemsNavigator.prototype.isLeafNode = function () {
        return false;
    };
    return ItemsNavigator;
}(BaseNavigator));
exports.ItemsNavigator = ItemsNavigator;
var ColumnNavigator = /** @class */ (function (_super) {
    __extends(ColumnNavigator, _super);
    function ColumnNavigator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ColumnNavigator;
}(ItemsNavigator));
exports.ColumnNavigator = ColumnNavigator;
var RowNavigator = /** @class */ (function (_super) {
    __extends(RowNavigator, _super);
    function RowNavigator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RowNavigator;
}(ItemsNavigator));
exports.RowNavigator = RowNavigator;
var StackNavigator = /** @class */ (function (_super) {
    __extends(StackNavigator, _super);
    function StackNavigator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StackNavigator;
}(ItemsNavigator));
exports.StackNavigator = StackNavigator;
var LeafObjectNavigator = /** @class */ (function (_super) {
    __extends(LeafObjectNavigator, _super);
    function LeafObjectNavigator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LeafObjectNavigator;
}(BaseNavigator));
exports.LeafObjectNavigator = LeafObjectNavigator;
function navigator(floaty, layoutId) {
    if (layoutId === void 0) { layoutId = '0'; }
    var item = floaty.layouts[layoutId].item;
    if (item !== undefined) {
        return createNavigator(floaty.items, item, undefined);
    }
}
exports.default = navigator;
//# sourceMappingURL=navigator.js.map
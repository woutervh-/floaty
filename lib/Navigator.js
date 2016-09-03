'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createNavigator(object, parent) {
    switch (object.type) {
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

var BaseNavigator = function () {
    function BaseNavigator(object, parent) {
        _classCallCheck(this, BaseNavigator);

        this._object = object;
        this._parent = parent;
    }

    _createClass(BaseNavigator, [{
        key: 'type',
        value: function type() {
            throw new Error('Abstract method');
        }
    }, {
        key: 'dispatcher',
        value: function dispatcher() {
            throw new Error('Abstract method');
        }
    }, {
        key: 'object',
        value: function object() {
            return this._object;
        }
    }, {
        key: 'parent',
        value: function parent() {
            return this._parent;
        }
    }]);

    return BaseNavigator;
}();

var ItemsNavigator = function (_BaseNavigator) {
    _inherits(ItemsNavigator, _BaseNavigator);

    function ItemsNavigator() {
        _classCallCheck(this, ItemsNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ItemsNavigator).apply(this, arguments));
    }

    _createClass(ItemsNavigator, [{
        key: 'items',
        value: function items() {
            var _this2 = this;

            return this._object.items.map(function (item) {
                return createNavigator(item, _this2);
            });
        }
    }, {
        key: 'item',
        value: function item(index) {
            return createNavigator(this._object.items[index], this);
        }
    }]);

    return ItemsNavigator;
}(BaseNavigator);

var ColumnNavigator = function (_ItemsNavigator) {
    _inherits(ColumnNavigator, _ItemsNavigator);

    function ColumnNavigator() {
        _classCallCheck(this, ColumnNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ColumnNavigator).apply(this, arguments));
    }

    _createClass(ColumnNavigator, [{
        key: 'type',
        value: function type() {
            return 'column';
        }
    }]);

    return ColumnNavigator;
}(ItemsNavigator);

var RowNavigator = function (_ItemsNavigator2) {
    _inherits(RowNavigator, _ItemsNavigator2);

    function RowNavigator() {
        _classCallCheck(this, RowNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RowNavigator).apply(this, arguments));
    }

    _createClass(RowNavigator, [{
        key: 'type',
        value: function type() {
            return 'row';
        }
    }]);

    return RowNavigator;
}(ItemsNavigator);

var StackNavigator = function (_ItemsNavigator3) {
    _inherits(StackNavigator, _ItemsNavigator3);

    function StackNavigator() {
        _classCallCheck(this, StackNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StackNavigator).apply(this, arguments));
    }

    _createClass(StackNavigator, [{
        key: 'type',
        value: function type() {
            return 'stack';
        }
    }]);

    return StackNavigator;
}(ItemsNavigator);
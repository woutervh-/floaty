'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = navigator;

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
        case 'prop-ref':
        case 'child-ref':
        case 'component':
            return new LeafObjectNavigator(object, parent);
        default:
            throw new Error('Unsupported type: ' + object.type);
    }
}

var BaseNavigator = function () {
    function BaseNavigator(object, parent) {
        _classCallCheck(this, BaseNavigator);

        this._object = object;
        this._parent = parent;
    }

    _createClass(BaseNavigator, [{
        key: 'object',
        value: function object() {
            return this._object;
        }
    }, {
        key: 'parent',
        value: function parent() {
            return this._parent;
        }
    }, {
        key: 'find',
        value: function find(predicate) {
            if (predicate(this._object)) {
                return this;
            }
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
    }, {
        key: 'find',
        value: function find(predicate) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.items()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var result = item.find(predicate);
                    if (result) {
                        return result;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
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

    return ColumnNavigator;
}(ItemsNavigator);

var RowNavigator = function (_ItemsNavigator2) {
    _inherits(RowNavigator, _ItemsNavigator2);

    function RowNavigator() {
        _classCallCheck(this, RowNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(RowNavigator).apply(this, arguments));
    }

    return RowNavigator;
}(ItemsNavigator);

var StackNavigator = function (_ItemsNavigator3) {
    _inherits(StackNavigator, _ItemsNavigator3);

    function StackNavigator() {
        _classCallCheck(this, StackNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(StackNavigator).apply(this, arguments));
    }

    return StackNavigator;
}(ItemsNavigator);

var LeafObjectNavigator = function (_BaseNavigator2) {
    _inherits(LeafObjectNavigator, _BaseNavigator2);

    function LeafObjectNavigator() {
        _classCallCheck(this, LeafObjectNavigator);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(LeafObjectNavigator).apply(this, arguments));
    }

    return LeafObjectNavigator;
}(BaseNavigator);

function navigator(state) {
    return createNavigator(state, null);
}
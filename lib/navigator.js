'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = navigator;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var BaseNavigator = function () {
    function BaseNavigator(items, id, parent) {
        _classCallCheck(this, BaseNavigator);

        this._items = items;
        this._id = id;
        this._parent = parent;
    }

    _createClass(BaseNavigator, [{
        key: 'object',
        value: function object() {
            return this._items[this._id];
        }
    }, {
        key: 'parent',
        value: function parent() {
            return this._parent;
        }
    }, {
        key: 'id',
        value: function id() {
            return this._id;
        }
    }, {
        key: 'find',
        value: function find(predicate) {
            if (predicate(this)) {
                return this;
            }
        }
    }, {
        key: 'findAll',
        value: function findAll(predicate) {
            var accumulator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            if (predicate(this)) {
                accumulator.push(this);
            }
        }
    }, {
        key: 'isLeafNode',
        value: function isLeafNode() {
            return true;
        }
    }]);

    return BaseNavigator;
}();

var ItemsNavigator = function (_BaseNavigator) {
    _inherits(ItemsNavigator, _BaseNavigator);

    function ItemsNavigator() {
        _classCallCheck(this, ItemsNavigator);

        return _possibleConstructorReturn(this, (ItemsNavigator.__proto__ || Object.getPrototypeOf(ItemsNavigator)).apply(this, arguments));
    }

    _createClass(ItemsNavigator, [{
        key: 'items',
        value: function items() {
            var _this2 = this;

            return this._items[this._id].items.map(function (item) {
                return createNavigator(_this2._items, item, _this2);
            });
        }
    }, {
        key: 'item',
        value: function item(index) {
            return createNavigator(this._items, this._items[this._id].items[index], this);
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

            return _get(ItemsNavigator.prototype.__proto__ || Object.getPrototypeOf(ItemsNavigator.prototype), 'find', this).call(this, predicate);
        }
    }, {
        key: 'findAll',
        value: function findAll(predicate) {
            var accumulator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.items()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var item = _step2.value;

                    item.findAll(predicate, accumulator);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            _get(ItemsNavigator.prototype.__proto__ || Object.getPrototypeOf(ItemsNavigator.prototype), 'find', this).call(this, predicate, accumulator);
        }
    }, {
        key: 'isLeafNode',
        value: function isLeafNode() {
            return false;
        }
    }]);

    return ItemsNavigator;
}(BaseNavigator);

var ColumnNavigator = function (_ItemsNavigator) {
    _inherits(ColumnNavigator, _ItemsNavigator);

    function ColumnNavigator() {
        _classCallCheck(this, ColumnNavigator);

        return _possibleConstructorReturn(this, (ColumnNavigator.__proto__ || Object.getPrototypeOf(ColumnNavigator)).apply(this, arguments));
    }

    return ColumnNavigator;
}(ItemsNavigator);

var RowNavigator = function (_ItemsNavigator2) {
    _inherits(RowNavigator, _ItemsNavigator2);

    function RowNavigator() {
        _classCallCheck(this, RowNavigator);

        return _possibleConstructorReturn(this, (RowNavigator.__proto__ || Object.getPrototypeOf(RowNavigator)).apply(this, arguments));
    }

    return RowNavigator;
}(ItemsNavigator);

var StackNavigator = function (_ItemsNavigator3) {
    _inherits(StackNavigator, _ItemsNavigator3);

    function StackNavigator() {
        _classCallCheck(this, StackNavigator);

        return _possibleConstructorReturn(this, (StackNavigator.__proto__ || Object.getPrototypeOf(StackNavigator)).apply(this, arguments));
    }

    return StackNavigator;
}(ItemsNavigator);

var LeafObjectNavigator = function (_BaseNavigator2) {
    _inherits(LeafObjectNavigator, _BaseNavigator2);

    function LeafObjectNavigator() {
        _classCallCheck(this, LeafObjectNavigator);

        return _possibleConstructorReturn(this, (LeafObjectNavigator.__proto__ || Object.getPrototypeOf(LeafObjectNavigator)).apply(this, arguments));
    }

    return LeafObjectNavigator;
}(BaseNavigator);

function navigator(floaty, layoutId) {
    return createNavigator(floaty.items, floaty.layouts[layoutId].item, null);
}
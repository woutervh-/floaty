'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = floaty;

var _constants = require('../constants');

var _identifiers = require('../identifiers');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function minimizeColumnOrRow(itemId, floatyItems, minimized, type) {
    var items = [];
    var growValues = [];
    var self = floatyItems[itemId];
    for (var i = 0; i < self.items.length; i++) {
        var child = self.items[i];
        var childItem = minimize(child, floatyItems, minimized);
        if (childItem !== undefined) {
            var growValue = self.growValues && self.growValues[i] || 1;
            if ((0, _identifiers.isIdentifier)(childItem) && floatyItems[childItem].type === type) {
                var growValuesSum = 0;
                for (var j = 0; j < floatyItems[childItem].items.length; j++) {
                    growValuesSum += floatyItems[childItem].growValues && floatyItems[childItem].growValues[j] || 1;
                }
                for (var _j = 0; _j < floatyItems[childItem].items.length; _j++) {
                    var childGrowValue = floatyItems[childItem].growValues && floatyItems[childItem].growValues[_j] || 1;
                    items.push(floatyItems[childItem].items[_j]);
                    growValues.push(growValue * childGrowValue / growValuesSum);
                }
            } else {
                items.push(childItem);
                growValues.push(growValue);
            }
        }
    }
    if (items.length >= 2) {
        floatyItems[itemId] = _extends({}, floatyItems[itemId], { items: items, growValues: growValues });
        return itemId;
    } else if (items.length === 1) {
        return items[0];
    }
}

function minimizeStack(itemId, floatyItems, minimized) {
    var items = [];
    var titles = [];
    var self = floatyItems[itemId];
    for (var i = 0; i < self.items.length; i++) {
        var child = self.items[i];
        var childItem = minimize(child, floatyItems, minimized);
        var title = self.titles[i];
        var titleItem = minimize(title, floatyItems, minimized);
        if (childItem !== undefined && titleItem !== undefined) {
            items.push(childItem);
            titles.push(titleItem);
        }
    }
    if (items.length >= 1) {
        floatyItems[itemId] = _extends({}, floatyItems[itemId], { items: items, titles: titles });
        return itemId;
    }
}

function minimize(item, floatyItems, minimized) {
    if ((0, _identifiers.isIdentifier)(item)) {
        if (!(item in minimized)) {
            switch (floatyItems[item].type) {
                case 'column':
                    minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'column');
                    break;
                case 'row':
                    minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'row');
                    break;
                case 'stack':
                    minimized[item] = minimizeStack(item, floatyItems, minimized);
                    break;
                default:
                    minimized[item] = item;
            }
        }
        return minimized[item];
    } else {
        return item;
    }
}

function columnOrRow(state, action) {
    switch (action.type) {
        case _constants.FLOATY_SET_GROW_VALUES:
            return _extends({}, state, { growValues: action.growValues });
        default:
            return state;
    }
}

function stack() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { active: 0, titles: [], items: [] };
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_REMOVE_TAB:
            {
                var items = [].concat(_toConsumableArray(state.items));
                items.splice(action.index, 1);
                var titles = [].concat(_toConsumableArray(state.titles));
                titles.splice(action.index, 1);
                if (state.active !== undefined) {
                    // Ensure active index is in range
                    var active = Math.min(items.length - 1, state.active);
                    return _extends({}, state, { active: active, items: items, titles: titles });
                } else {
                    return _extends({}, state, { items: items, titles: titles });
                }
            }
        case _constants.FLOATY_REMOVE_ACTIVE_TAB:
            {
                var _items = [].concat(_toConsumableArray(state.items));
                _items.splice(state.active, 1);
                var _titles = [].concat(_toConsumableArray(state.titles));
                _titles.splice(state.active, 1);
                if (typeof state.active !== 'undefined') {
                    // Ensure active index is in range
                    var _active = Math.min(_items.length - 1, state.active);
                    return _extends({}, state, { active: _active, items: _items, titles: _titles });
                } else {
                    return _extends({}, state, { items: _items, titles: _titles });
                }
            }
        case _constants.FLOATY_INSERT_TAB:
            {
                var _items2 = [].concat(_toConsumableArray(state.items));
                _items2.splice(action.index, 0, action.item);
                var _titles2 = [].concat(_toConsumableArray(state.titles));
                _titles2.splice(action.index, 0, action.title);
                return _extends({}, state, { items: _items2, titles: _titles2 });
            }
        case _constants.FLOATY_ADD_TAB:
            {
                var _items3 = [].concat(_toConsumableArray(state.items), [action.item]);
                var _titles3 = [].concat(_toConsumableArray(state.titles), [action.title]);
                return _extends({}, state, { active: _items3.length - 1, items: _items3, titles: _titles3 });
            }
        case _constants.FLOATY_SET_ACTIVE_TAB:
            return _extends({}, state, { active: action.index });
        default:
            return state;
    }
}

function floatyItem() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_REMOVE_TAB:
        case _constants.FLOATY_REMOVE_ACTIVE_TAB:
        case _constants.FLOATY_INSERT_TAB:
        case _constants.FLOATY_ADD_TAB:
        case _constants.FLOATY_SET_ACTIVE_TAB:
            return stack(state, action);
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
            return { type: 'column', items: action.items };
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            return { type: 'row', items: action.items };
        case _constants.FLOATY_SET_GROW_VALUES:
            return columnOrRow(state, action);
        case _constants.FLOATY_ADD_ITEM:
            return action.item;
        case _constants.FLOATY_SET_ITEM_STATE:
            return _extends({}, state, { state: action.state });
        default:
            return state;
    }
}

function floatyItems() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_REMOVE_TAB:
        case _constants.FLOATY_REMOVE_ACTIVE_TAB:
        case _constants.FLOATY_INSERT_TAB:
        case _constants.FLOATY_ADD_TAB:
        case _constants.FLOATY_SET_ACTIVE_TAB:
        case _constants.FLOATY_SET_GROW_VALUES:
        case _constants.FLOATY_ADD_ITEM:
        case _constants.FLOATY_SET_ITEM_STATE:
            return _extends({}, state, _defineProperty({}, action.itemId, floatyItem(state[action.itemId], action)));
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            {
                var itemId = action.itemId;
                var newItemsBefore = action.newItemsBefore;
                var _ref = [action.newId1, action.newId2];
                var id1 = _ref[0];
                var id2 = _ref[1];

                if (newItemsBefore) {
                    var _extends3;

                    return _extends({}, state, (_extends3 = {}, _defineProperty(_extends3, itemId, floatyItem(state[itemId], { type: action.type, items: [id1, id2] })), _defineProperty(_extends3, id1, action.item), _defineProperty(_extends3, id2, state[itemId]), _extends3));
                } else {
                    var _extends4;

                    return _extends({}, state, (_extends4 = {}, _defineProperty(_extends4, itemId, floatyItem(state[itemId], { type: action.type, items: [id1, id2] })), _defineProperty(_extends4, id1, state[itemId]), _defineProperty(_extends4, id2, action.item), _extends4));
                }
            }
        case _constants.FLOATY_SET_LAYOUT:
            return _extends({}, state, _defineProperty({}, action.itemId, action.item));
        default:
            return state;
    }
}

function floatyLayout() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { item: 0, floatingItem: null, floatingTitle: null };
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_START_FLOATING:
            return _extends({}, state, { floatingItem: action.item, floatingTitle: action.title });
        case _constants.FLOATY_STOP_FLOATING:
            return _extends({}, state, { floatingItem: null, floatingTitle: null });
        case _constants.FLOATY_SET_LAYOUT:
            return _extends({}, state, { item: action.itemId });
        default:
            return state;
    }
}

function floatyLayouts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_START_FLOATING:
        case _constants.FLOATY_STOP_FLOATING:
        case _constants.FLOATY_SET_LAYOUT:
            return _extends({}, state, _defineProperty({}, action.layoutId, floatyLayout(state[action.layoutId], action)));
        default:
            return state;
    }
}

function sweep(items, marked) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = Object.keys(items)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            if (!(key in marked)) {
                delete items[key];
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

function floaty() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    var _ret = function () {
        switch (action.type) {
            case _constants.FLOATY_SET_LAYOUT:
            case _constants.FLOATY_REMOVE_TAB:
            case _constants.FLOATY_REMOVE_ACTIVE_TAB:
            case _constants.FLOATY_INSERT_TAB:
            case _constants.FLOATY_ADD_TAB:
            case _constants.FLOATY_SET_ACTIVE_TAB:
            case _constants.FLOATY_SET_GROW_VALUES:
            case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
            case _constants.FLOATY_TRANSFORM_INTO_ROW:
            case _constants.FLOATY_START_FLOATING:
            case _constants.FLOATY_STOP_FLOATING:
            case _constants.FLOATY_ADD_ITEM:
                var items = state.items;
                var layouts = state.layouts;

                var next = {
                    items: _extends({}, floatyItems(items, action)),
                    layouts: _extends({}, floatyLayouts(layouts, action))
                };
                var minimized = {};
                Object.keys(next.layouts).forEach(function (key) {
                    var layout = next.layouts[key];
                    var item = layout.item;
                    var floatingItem = layout.floatingItem;
                    var floatingTitle = layout.floatingTitle;

                    layout.item = minimize(item, next.items, minimized);
                    layout.floatingItem = minimize(floatingItem, next.items, minimized);
                    layout.floatingTitle = minimize(floatingTitle, next.items, minimized);
                });
                if (action.meta && action.meta.floaty && action.meta.floaty.sweep === true) {
                    sweep(next.items, minimized);
                }
                return {
                    v: next
                };
            default:
                return {
                    v: state
                };
        }
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
}
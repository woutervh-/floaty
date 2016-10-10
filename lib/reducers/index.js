'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = floaty;

var _constants = require('../constants');

var _LayoutUtil = require('./LayoutUtil');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function column(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function row(state, action) {
    switch (action.type) {
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
                if (typeof state.active !== 'undefined') {
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
        default:
            return state;
    }
}

// function generic(state, action) {
//     switch (action.type) {
//         case FLOATY_TRANSFORM_INTO_COLUMN:
//             return transformToColumn(state, action.items, action.newItemsBefore);
//         case FLOATY_TRANSFORM_INTO_ROW:
//             return transformToRow(state, action.items, action.newItemsBefore);
//         case FLOATY_SET_LAYOUT:
//             return action.layout;
//         case FLOATY_SET_STATE_FROM_REDUCER:
//             return {...state, state: action.reducer(state.state, action.update)};
//         default:
//             return state;
//     }
// }

function floatyItem() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_REMOVE_TAB:
        case _constants.FLOATY_REMOVE_ACTIVE_TAB:
        case _constants.FLOATY_INSERT_TAB:
        case _constants.FLOATY_ADD_TAB:
            return stack(state, action);
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
            return { type: 'column', items: action.items };
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            return { type: 'row', items: action.items };
        default:
            return state;
    }
}

function floatyItems() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_REMOVE_TAB:
        case _constants.FLOATY_REMOVE_ACTIVE_TAB:
        case _constants.FLOATY_INSERT_TAB:
        case _constants.FLOATY_ADD_TAB:
            {
                var items = [].concat(_toConsumableArray(state));
                items[action.stackId] = floatyItem(state[action.stackId], action);
                return items;
            }
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            {
                var itemId = action.itemId;
                var newItemsBefore = action.newItemsBefore;

                var _items4 = [].concat(_toConsumableArray(state), [state[itemId], action.item]);
                if (newItemsBefore) {
                    _items4[action.itemId] = floatyItem(state[itemId], { type: action.type, items: [_items4.length - 1, _items4.length - 2] });
                } else {
                    _items4[action.itemId] = floatyItem(state[itemId], { type: action.type, items: [_items4.length - 2, _items4.length - 1] });
                }
                return _items4;
            }
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
        default:
            return state;
    }
}

function floatyLayouts() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var action = arguments[1];

    switch (action.type) {
        case _constants.FLOATY_START_FLOATING:
        case _constants.FLOATY_STOP_FLOATING:
            var layouts = [].concat(_toConsumableArray(state));
            layouts[action.layoutId] = floatyLayout(layouts[action.layoutId], action);
            return layouts;
        default:
            return state;
    }
}

function floaty() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    var _state$entities = state.entities;
    var entities = _state$entities === undefined ? {} : _state$entities;
    var items = entities.floatyItems;
    var layouts = entities.floatyLayouts;

    return _extends({}, state, { entities: _extends({}, entities, { floatyItems: floatyItems(items, action), floatyLayouts: floatyLayouts(layouts, action) }) });
}

// export default function floaty(state, action) {
//     return generic(state, action) || {type: 'component', content: ''};
// };
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
        case _constants.FLOATY_UPDATE_GROW_VALUES:
            return _extends({}, state, { growValues: action.growValues });
        case _constants.FLOATY_UPDATE_COLUMN_ITEM:
            var items = [].concat(_toConsumableArray(state.items));
            items[action.index] = columnItem(items[action.index], action.update);
            return _extends({}, state, { items: items });
        default:
            return state;
    }
}

function row(state, action) {
    switch (action.type) {
        case _constants.FLOATY_UPDATE_GROW_VALUES:
            return _extends({}, state, { growValues: action.growValues });
        case _constants.FLOATY_UPDATE_ROW_ITEM:
            var items = [].concat(_toConsumableArray(state.items));
            items[action.index] = rowItem(items[action.index], action.update);
            return _extends({}, state, { items: items });
        default:
            return state;
    }
}

function columnItem(state, action) {
    switch (action.type) {
        case _constants.FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function rowItem(state, action) {
    switch (action.type) {
        case _constants.FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function stack(state, action) {
    switch (action.type) {
        case _constants.FLOATY_UPDATE_ACTIVE_TAB:
            return _extends({}, state, { active: action.index });
        case _constants.FLOATY_UPDATE_STACK_ITEM:
            {
                var items = [].concat(_toConsumableArray(state.items));
                items[action.index] = stackItem(items[action.index], action.update);
                return _extends({}, state, { items: items });
            }
        case _constants.FLOATY_REMOVE_TAB:
            {
                var _items = [].concat(_toConsumableArray(state.items));
                _items.splice(action.index, 1);
                var titles = [].concat(_toConsumableArray(state.titles));
                titles.splice(action.index, 1);
                if ('active' in state) {
                    // Ensure active index is in range
                    var active = Math.min(_items.length - 1, state.active);
                    return _extends({}, state, { active: active, items: _items, titles: titles });
                } else {
                    return _extends({}, state, { items: _items, titles: titles });
                }
            }
        case _constants.FLOATY_INSERT_TAB:
            {
                var _items2 = [].concat(_toConsumableArray(state.items));
                _items2.splice(action.index, 0, action.item);
                var _titles = [].concat(_toConsumableArray(state.titles));
                _titles.splice(action.index, 0, action.title);
                return _extends({}, state, { items: _items2, titles: _titles });
            }
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            return (0, _LayoutUtil.transformToRow)(state, action.items, action.newItemsBefore);
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
            return (0, _LayoutUtil.transformToColumn)(state, action.items, action.newItemsBefore);
        default:
            return state;
    }
}

function stackItem(state, action) {
    switch (action.type) {
        case _constants.FLOATY_UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function generic(state, action) {
    switch (action.type) {
        case _constants.FLOATY_TRANSFORM_INTO_COLUMN:
            return (0, _LayoutUtil.transformToColumn)(state, action.items, action.newItemsBefore);
        case _constants.FLOATY_TRANSFORM_INTO_ROW:
            return (0, _LayoutUtil.transformToRow)(state, action.items, action.newItemsBefore);
        case _constants.FLOATY_UPDATE_COLUMN:
            return (0, _LayoutUtil.minimizeColumn)(column(state, action.update));
        case _constants.FLOATY_UPDATE_ROW:
            return (0, _LayoutUtil.minimizeRow)(row(state, action.update));
        case _constants.FLOATY_UPDATE_STACK:
            return (0, _LayoutUtil.minimizeStack)(stack(state, action.update));
        case _constants.FLOATY_SET_LAYOUT:
            return action.layout;
        default:
            return state;
    }
}

function floaty(state, action) {
    return generic(state, action) || {};
};
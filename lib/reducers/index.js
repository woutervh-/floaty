'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function row(state, action) {
    switch (action.type) {
        case _constants.UPDATE_GROW_VALUES:
            return _extends({}, state, { growValues: action.growValues });
        case _constants.UPDATE_ROW_ITEM:
            var items = [].concat(_toConsumableArray(state.items));
            items[action.index] = rowItem(items[action.index], action.update);
            return _extends({}, state, { items: items });
        default:
            return state;
    }
}

function rowItem(state, action) {
    switch (action.type) {
        case _constants.UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function stack(state, action) {
    switch (action.type) {
        case _constants.UPDATE_ACTIVE_TAB:
            return _extends({}, state, { active: action.index });
        case _constants.UPDATE_STACK_ITEM:
            var items = [].concat(_toConsumableArray(state.items));
            items[action.index] = stackItem(items[action.index], action.update);
            return _extends({}, state, { items: items });
        default:
            return state;
    }
}

function stackItem(state, action) {
    switch (action.type) {
        case _constants.UPDATE_GENERIC:
            return generic(state, action.update);
        default:
            return state;
    }
}

function propRef(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function childRef(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function component(state, action) {
    switch (action.type) {
        default:
            return state;
    }
}

function generic(state, action) {
    switch (action.type) {
        case _constants.SET_PROP:
            return _extends({}, state, { props: _extends({}, state.props, _defineProperty({}, action.key, action.value)) });
        case _constants.UPDATE_ROW:
            return row(state, action.update);
        case _constants.UPDATE_STACK:
            return stack(state, action.update);
        default:
            return component(state, action);
    }
}

exports.default = generic;
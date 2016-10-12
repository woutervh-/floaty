'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var floatySelector = exports.floatySelector = function floatySelector(state, props) {
    return _extends({}, state.entities.floaty.layouts[props.id], {
        floaty: state.entities.floaty,
        isFloating: state.entities.floaty.layouts[props.id].floatingItem !== null && state.entities.floaty.layouts[props.id].floatingItem !== undefined
    });
};

var itemSelector = exports.itemSelector = function itemSelector(state, props) {
    var item = state.entities.floaty.items[props.id];
    if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
        return item;
    } else {
        return { type: 'component', content: state };
    }
};
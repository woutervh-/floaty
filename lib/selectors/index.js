'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var itemSelector = exports.itemSelector = function itemSelector(state, props) {
  return (typeof state === 'undefined' ? 'undefined' : _typeof(state)) === 'object' ? state.entities.floatyItems[props.id] : { type: 'component', content: state };
};

var columnSelector = exports.columnSelector = function columnSelector(state, props) {
  return state.entities.floatyColumns[props.id];
};

var rowSelector = exports.rowSelector = function rowSelector(state, props) {
  return state.entities.floatyRows[props.id];
};

var stackSelector = exports.stackSelector = function stackSelector(state, props) {
  return state.entities.floatyStacks[props.id];
};
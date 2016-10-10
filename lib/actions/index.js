'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setActiveTab = setActiveTab;
exports.removeTab = removeTab;
exports.removeActiveTab = removeActiveTab;
exports.insertTab = insertTab;
exports.addTab = addTab;
exports.noOperation = noOperation;
exports.transformIntoColumn = transformIntoColumn;
exports.transformIntoRow = transformIntoRow;
exports.setLayout = setLayout;
exports.setStateFromReducer = setStateFromReducer;
exports.startFloating = startFloating;
exports.stopFloating = stopFloating;

var _constants = require('../constants');

function setActiveTab(index) {
    return {
        type: _constants.FLOATY_SET_ACTIVE_TAB,
        index: index
    };
}

function removeTab(stackId, index) {
    return {
        type: _constants.FLOATY_REMOVE_TAB,
        stackId: stackId,
        index: index
    };
}

function removeActiveTab() {
    return { type: _constants.FLOATY_REMOVE_ACTIVE_TAB };
}

function insertTab(index, item, title) {
    return {
        type: _constants.FLOATY_INSERT_TAB,
        index: index,
        item: item,
        title: title
    };
}

function addTab(item, title) {
    return {
        type: _constants.FLOATY_ADD_TAB,
        item: item,
        title: title
    };
}

function noOperation() {
    return { type: _constants.FLOATY_NO_OPERATION };
}

function transformIntoColumn(itemId, item, newItemsBefore) {
    return {
        type: _constants.FLOATY_TRANSFORM_INTO_COLUMN,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore
    };
}

function transformIntoRow(itemId, item, newItemsBefore) {
    return {
        type: _constants.FLOATY_TRANSFORM_INTO_ROW,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore
    };
}

function setLayout(layout) {
    return {
        type: _constants.FLOATY_SET_LAYOUT,
        layout: layout
    };
}

function setStateFromReducer(reducer, update) {
    return {
        type: _constants.FLOATY_SET_STATE_FROM_REDUCER,
        reducer: reducer,
        update: update
    };
}

function startFloating(layoutId, item, title) {
    return {
        type: _constants.FLOATY_START_FLOATING,
        layoutId: layoutId,
        item: item,
        title: title
    };
}

function stopFloating(layoutId) {
    return {
        type: _constants.FLOATY_STOP_FLOATING,
        layoutId: layoutId
    };
}
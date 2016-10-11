'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setGrowValues = setGrowValues;
exports.setActiveTab = setActiveTab;
exports.removeTab = removeTab;
exports.removeActiveTab = removeActiveTab;
exports.insertTab = insertTab;
exports.addTab = addTab;
exports.transformIntoColumn = transformIntoColumn;
exports.transformIntoRow = transformIntoRow;
exports.setLayout = setLayout;
exports.startFloating = startFloating;
exports.stopFloating = stopFloating;

var _constants = require('../constants');

function setGrowValues(itemId, growValues) {
    return {
        type: _constants.FLOATY_SET_GROW_VALUES,
        itemId: itemId,
        growValues: growValues
    };
}

function setActiveTab(itemId, index) {
    return {
        type: _constants.FLOATY_SET_ACTIVE_TAB,
        itemId: itemId,
        index: index
    };
}

function removeTab(itemId, index) {
    return {
        type: _constants.FLOATY_REMOVE_TAB,
        itemId: itemId,
        index: index
    };
}

function removeActiveTab(itemId) {
    return {
        type: _constants.FLOATY_REMOVE_ACTIVE_TAB,
        itemId: itemId
    };
}

function insertTab(itemId, index, item, title) {
    return {
        type: _constants.FLOATY_INSERT_TAB,
        itemId: itemId,
        index: index,
        item: item,
        title: title
    };
}

function addTab(itemId, item, title) {
    return {
        type: _constants.FLOATY_ADD_TAB,
        itemId: itemId,
        item: item,
        title: title
    };
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

function setLayout(layoutId, item) {
    return {
        type: _constants.FLOATY_SET_LAYOUT,
        layoutId: layoutId,
        item: item
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
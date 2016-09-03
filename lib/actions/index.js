'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateGrowValues = updateGrowValues;
exports.updateRow = updateRow;
exports.updateRowItem = updateRowItem;
exports.updateColumn = updateColumn;
exports.updateColumnItem = updateColumnItem;
exports.updateGeneric = updateGeneric;
exports.updateActiveTab = updateActiveTab;
exports.removeTab = removeTab;
exports.removeActiveTab = removeActiveTab;
exports.insertTab = insertTab;
exports.addTab = addTab;
exports.updateStack = updateStack;
exports.updateStackItem = updateStackItem;
exports.noOperation = noOperation;
exports.transformIntoRow = transformIntoRow;
exports.transformIntoColumn = transformIntoColumn;
exports.setLayout = setLayout;

var _constants = require('../constants');

function updateGrowValues(growValues) {
    return {
        type: _constants.FLOATY_UPDATE_GROW_VALUES,
        growValues: growValues
    };
}

function updateRow(update) {
    return {
        type: _constants.FLOATY_UPDATE_ROW,
        update: update
    };
}

function updateRowItem(index, update) {
    return {
        type: _constants.FLOATY_UPDATE_ROW_ITEM,
        index: index,
        update: update
    };
}

function updateColumn(update) {
    return {
        type: _constants.FLOATY_UPDATE_COLUMN,
        update: update
    };
}

function updateColumnItem(index, update) {
    return {
        type: _constants.FLOATY_UPDATE_COLUMN_ITEM,
        index: index,
        update: update
    };
}

function updateGeneric(update) {
    return {
        type: _constants.FLOATY_UPDATE_GENERIC,
        update: update
    };
}

function updateActiveTab(index) {
    return {
        type: _constants.FLOATY_UPDATE_ACTIVE_TAB,
        index: index
    };
}

function removeTab(index) {
    return {
        type: _constants.FLOATY_REMOVE_TAB,
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

function updateStack(update) {
    return {
        type: _constants.FLOATY_UPDATE_STACK,
        update: update
    };
}

function updateStackItem(index, update) {
    return {
        type: _constants.FLOATY_UPDATE_STACK_ITEM,
        index: index,
        update: update
    };
}

function noOperation() {
    return { type: _constants.FLOATY_NO_OPERATION };
}

function transformIntoRow(items, newItemsBefore) {
    return {
        type: _constants.FLOATY_TRANSFORM_INTO_ROW,
        items: items,
        newItemsBefore: newItemsBefore
    };
}

function transformIntoColumn(items, newItemsBefore) {
    return {
        type: _constants.FLOATY_TRANSFORM_INTO_COLUMN,
        items: items,
        newItemsBefore: newItemsBefore
    };
}

function setLayout(layout) {
    return {
        type: _constants.FLOATY_SET_LAYOUT,
        layout: layout
    };
}
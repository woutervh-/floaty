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
exports.insertTab = insertTab;
exports.updateStack = updateStack;
exports.updateStackItem = updateStackItem;
exports.noOperation = noOperation;
exports.transformIntoRow = transformIntoRow;
exports.transformIntoColumn = transformIntoColumn;

var _constants = require('../constants');

function updateGrowValues(growValues) {
    return {
        type: _constants.UPDATE_GROW_VALUES,
        growValues: growValues
    };
}

function updateRow(update) {
    return {
        type: _constants.UPDATE_ROW,
        update: update
    };
}

function updateRowItem(index, update) {
    return {
        type: _constants.UPDATE_ROW_ITEM,
        index: index,
        update: update
    };
}

function updateColumn(update) {
    return {
        type: _constants.UPDATE_COLUMN,
        update: update
    };
}

function updateColumnItem(index, update) {
    return {
        type: _constants.UPDATE_COLUMN_ITEM,
        index: index,
        update: update
    };
}

function updateGeneric(update) {
    return {
        type: _constants.UPDATE_GENERIC,
        update: update
    };
}

function updateActiveTab(index) {
    return {
        type: _constants.UPDATE_ACTIVE_TAB,
        index: index
    };
}

function removeTab(index) {
    return {
        type: _constants.REMOVE_TAB,
        index: index
    };
}

function insertTab(index, item, name) {
    return {
        type: _constants.INSERT_TAB,
        index: index,
        item: item,
        name: name
    };
}

function updateStack(update) {
    return {
        type: _constants.UPDATE_STACK,
        update: update
    };
}

function updateStackItem(index, update) {
    return {
        type: _constants.UPDATE_STACK_ITEM,
        index: index,
        update: update
    };
}

function noOperation() {
    return { type: _constants.NO_OPERATION };
}

function transformIntoRow(items, newItemsBefore) {
    return {
        type: _constants.TRANSFORM_INTO_ROW,
        items: items,
        newItemsBefore: newItemsBefore
    };
}

function transformIntoColumn(items, newItemsBefore) {
    return {
        type: _constants.TRANSFORM_INTO_COLUMN,
        items: items,
        newItemsBefore: newItemsBefore
    };
}
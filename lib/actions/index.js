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
exports.sweep = sweep;
exports.addItem = addItem;

var _constants = require('../constants');

var _identifiers = require('../identifiers');

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
    var newId1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _identifiers.generateIdentifier)();
    var newId2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _identifiers.generateIdentifier)();

    return {
        type: _constants.FLOATY_TRANSFORM_INTO_COLUMN,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore,
        newId1: newId1,
        newId2: newId2
    };
}

function transformIntoRow(itemId, item, newItemsBefore) {
    var newId1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : (0, _identifiers.generateIdentifier)();
    var newId2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : (0, _identifiers.generateIdentifier)();

    return {
        type: _constants.FLOATY_TRANSFORM_INTO_ROW,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore,
        newId1: newId1,
        newId2: newId2
    };
}

function setLayout(layoutId, item) {
    var itemId = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _identifiers.generateIdentifier)();

    return {
        type: _constants.FLOATY_SET_LAYOUT,
        layoutId: layoutId,
        item: item,
        itemId: itemId
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

function sweep() {
    return { type: _constants.FLOATY_SWEEP };
}

function addItem(itemId, item) {
    return {
        type: _constants.FLOATY_ADD_ITEM,
        itemId: itemId,
        item: item
    };
}
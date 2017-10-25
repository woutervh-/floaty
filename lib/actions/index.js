"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var identifiers_1 = require("../identifiers");
function setGrowValues(itemId, growValues) {
    return {
        type: constants_1.FLOATY_SET_GROW_VALUES,
        itemId: itemId,
        growValues: growValues
    };
}
exports.setGrowValues = setGrowValues;
function setActiveTab(itemId, index) {
    return {
        type: constants_1.FLOATY_SET_ACTIVE_TAB,
        itemId: itemId,
        index: index
    };
}
exports.setActiveTab = setActiveTab;
function removeTab(itemId, index) {
    return {
        type: constants_1.FLOATY_REMOVE_TAB,
        itemId: itemId,
        index: index,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.removeTab = removeTab;
function removeActiveTab(itemId) {
    return {
        type: constants_1.FLOATY_REMOVE_ACTIVE_TAB,
        itemId: itemId
    };
}
exports.removeActiveTab = removeActiveTab;
function insertTab(itemId, index, item, title) {
    return {
        type: constants_1.FLOATY_INSERT_TAB,
        itemId: itemId,
        index: index,
        item: item,
        title: title
    };
}
exports.insertTab = insertTab;
function addTab(itemId, item, title) {
    return {
        type: constants_1.FLOATY_ADD_TAB,
        itemId: itemId,
        item: item,
        title: title
    };
}
exports.addTab = addTab;
function transformIntoColumn(itemId, item, newItemsBefore, newId1, newId2) {
    if (newId1 === void 0) { newId1 = identifiers_1.generateIdentifier(); }
    if (newId2 === void 0) { newId2 = identifiers_1.generateIdentifier(); }
    return {
        type: constants_1.FLOATY_TRANSFORM_INTO_COLUMN,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore,
        newId1: newId1,
        newId2: newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.transformIntoColumn = transformIntoColumn;
function transformIntoRow(itemId, item, newItemsBefore, newId1, newId2) {
    if (newId1 === void 0) { newId1 = identifiers_1.generateIdentifier(); }
    if (newId2 === void 0) { newId2 = identifiers_1.generateIdentifier(); }
    return {
        type: constants_1.FLOATY_TRANSFORM_INTO_ROW,
        itemId: itemId,
        item: item,
        newItemsBefore: newItemsBefore,
        newId1: newId1,
        newId2: newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.transformIntoRow = transformIntoRow;
function setLayout(layoutId, item, itemId) {
    if (itemId === void 0) { itemId = identifiers_1.generateIdentifier(); }
    return {
        type: constants_1.FLOATY_SET_LAYOUT,
        layoutId: layoutId,
        item: item,
        itemId: itemId,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.setLayout = setLayout;
function startFloating(layoutId, item, title) {
    return {
        type: constants_1.FLOATY_START_FLOATING,
        layoutId: layoutId,
        item: item,
        title: title
    };
}
exports.startFloating = startFloating;
function stopFloating(layoutId) {
    return {
        type: constants_1.FLOATY_STOP_FLOATING,
        layoutId: layoutId,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.stopFloating = stopFloating;
function addItem(itemId, item) {
    return {
        type: constants_1.FLOATY_ADD_ITEM,
        itemId: itemId,
        item: item
    };
}
exports.addItem = addItem;
function setItemState(itemId, state) {
    return {
        type: constants_1.FLOATY_SET_ITEM_STATE,
        itemId: itemId,
        state: state
    };
}
exports.setItemState = setItemState;
//# sourceMappingURL=index.js.map
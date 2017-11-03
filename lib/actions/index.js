"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const identifiers_1 = require("../identifiers");
function setGrowValues(itemId, growValues) {
    return {
        type: constants_1.FLOATY_SET_GROW_VALUES,
        itemId,
        growValues
    };
}
exports.setGrowValues = setGrowValues;
function setActiveTab(itemId, index) {
    return {
        type: constants_1.FLOATY_SET_ACTIVE_TAB,
        itemId,
        index
    };
}
exports.setActiveTab = setActiveTab;
function removeTab(itemId, index) {
    return {
        type: constants_1.FLOATY_REMOVE_TAB,
        itemId,
        index,
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
        itemId
    };
}
exports.removeActiveTab = removeActiveTab;
function insertTab(itemId, index, item, title) {
    return {
        type: constants_1.FLOATY_INSERT_TAB,
        itemId,
        index,
        item,
        title
    };
}
exports.insertTab = insertTab;
function addTab(itemId, item, title) {
    return {
        type: constants_1.FLOATY_ADD_TAB,
        itemId,
        item,
        title
    };
}
exports.addTab = addTab;
function transformIntoColumn(itemId, item, newItemsBefore, newId1 = identifiers_1.generateIdentifier(), newId2 = identifiers_1.generateIdentifier()) {
    return {
        type: constants_1.FLOATY_TRANSFORM_INTO_COLUMN,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.transformIntoColumn = transformIntoColumn;
function transformIntoRow(itemId, item, newItemsBefore, newId1 = identifiers_1.generateIdentifier(), newId2 = identifiers_1.generateIdentifier()) {
    return {
        type: constants_1.FLOATY_TRANSFORM_INTO_ROW,
        itemId,
        item,
        newItemsBefore,
        newId1,
        newId2,
        meta: {
            floaty: {
                sweep: true
            }
        }
    };
}
exports.transformIntoRow = transformIntoRow;
function setLayout(layoutId, item, itemId = identifiers_1.generateIdentifier()) {
    return {
        type: constants_1.FLOATY_SET_LAYOUT,
        layoutId,
        item,
        itemId,
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
        layoutId,
        item,
        title
    };
}
exports.startFloating = startFloating;
function stopFloating(layoutId) {
    return {
        type: constants_1.FLOATY_STOP_FLOATING,
        layoutId,
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
        itemId,
        item
    };
}
exports.addItem = addItem;
function setItemState(itemId, state) {
    return {
        type: constants_1.FLOATY_SET_ITEM_STATE,
        itemId,
        state
    };
}
exports.setItemState = setItemState;
//# sourceMappingURL=index.js.map
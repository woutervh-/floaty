'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.minimizeColumn = minimizeColumn;
exports.minimizeRow = minimizeRow;
exports.minimizeStack = minimizeStack;
exports.transformToColumn = transformToColumn;
exports.transformToRow = transformToRow;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function minimizeRowOrColumn(object, rowOrColumn) {
    // Filter falsy items and merge child rows/columns with this row/column
    var items = [];
    var growValues = [];
    for (var i = 0; i < object.items.length; i++) {
        var item = object.items[i];
        if (!!item) {
            var growValue = 'growValues' in object && object.growValues[i] || 1;
            if (item.type == rowOrColumn) {
                var growValuesSum = 0;
                for (var j = 0; j < item.items.length; j++) {
                    growValuesSum += 'growValues' in item && item.growValues[j] || 1;
                }
                for (var _j = 0; _j < item.items.length; _j++) {
                    var childItem = item.items[_j];
                    var childGrowValue = 'growValues' in item && item.growValues[_j] || 1;
                    items.push(childItem);
                    growValues.push(growValue * childGrowValue / growValuesSum);
                }
            } else {
                items.push(item);
                growValues.push(growValue);
            }
        }
    }

    if (items.length >= 2) {
        return _extends({}, object, { items: items, growValues: growValues });
    } else if (items.length == 1) {
        // Dissolve the row/column object - become whatever is inside
        return items[0];
    }
}

function minimizeColumn(columnObject) {
    return minimizeRowOrColumn(columnObject, 'column');
}

function minimizeRow(rowObject) {
    return minimizeRowOrColumn(rowObject, 'row');
}

function minimizeStack(stackObject) {
    // Filter falsy items
    var items = stackObject.items.filter(Boolean);

    if (stackObject.items.length >= 1) {
        return _extends({}, stackObject, { items: items });
    }
}

function transformToColumn(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return { type: 'column', items: [].concat(_toConsumableArray(items), [object]) };
    } else {
        return { type: 'column', items: [object].concat(_toConsumableArray(items)) };
    }
}

function transformToRow(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return { type: 'row', items: [].concat(_toConsumableArray(items), [object]) };
    } else {
        return { type: 'row', items: [object].concat(_toConsumableArray(items)) };
    }
}
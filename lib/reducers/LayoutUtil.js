'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.minimizeRow = minimizeRow;
exports.minimizeStack = minimizeStack;
exports.transformToRow = transformToRow;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function minimizeRow(rowObject) {
    // Filter falsy items and merge child rows with this row
    var items = [];
    var growValues = [];
    for (var i = 0; i < rowObject.items.length; i++) {
        var item = rowObject.items[i];
        if (!!item) {
            var growValue = 'growValues' in rowObject && rowObject.growValues[i] || 1;
            if (item.type == 'row') {
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

    console.log('minimized growValues');
    console.log(growValues);

    if (rowObject.items.length >= 2) {
        return _extends({}, rowObject, { items: items, growValues: growValues });
    } else if (rowObject.items.length == 1) {
        // Dissolve the row object - become whatever is inside
        return rowObject.items[0];
    }
}

function minimizeStack(stackObject) {
    // Filter falsy items
    var items = stackObject.items.filter(Boolean);

    if (stackObject.items.length >= 1) {
        return _extends({}, stackObject, { items: items });
    }
}

function transformToRow(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return { type: 'row', items: [].concat(_toConsumableArray(items), [object]) };
    } else {
        return { type: 'row', items: [object].concat(_toConsumableArray(items)) };
    }
}
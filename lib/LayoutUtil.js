'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function isGenericMinimal(genericObject) {
    if (!genericObject) {
        return true;
    }

    switch (genericObject.type) {
        case 'row':
            return isRowMinimal(genericObject);
        case 'stack':
            return isStackMinimal(genericObject);
        default:
            return true;
    }
}

function isRowMinimal(rowObject) {
    return rowObject.items.length >= 2 && rowObject.items.every(isGenericMinimal);
}

function isStackMinimal(stackObject) {
    return stackObject.items.length >= 1 && stackObject.items.every(isGenericMinimal);
}

function minimizeGeneric(genericObject) {
    switch (genericObject.type) {
        case 'row':
            return minimizeRow(genericObject);
        case 'stack':
            return minimizeStack(genericObject);
        default:
            return genericObject;
    }
}

function minimizeRow(rowObject) {
    // Minimize items inside first, and save only the truthy ones
    var items = rowObject.items.map(minimizeGeneric).filter(Boolean);

    if (items.length >= 2) {
        return _extends({}, rowObject, { items: items });
    } else if (items.length == 1) {
        // Dissolve the row object - become whatever is inside
        return items[0];
    }
}

function minimizeStack(stackObject) {
    // Minimize items inside first, and save only the truthy ones
    var items = stackObject.items.map(minimizeGeneric).filter(Boolean);

    if (items.length >= 1) {
        return _extends({}, stackObject, { items: items });
    }
}

exports.isLayoutMinimal = isGenericMinimal;
exports.minimizeLayout = minimizeGeneric;
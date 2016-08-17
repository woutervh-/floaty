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
    const items = rowObject.items.map(minimizeGeneric).filter(Boolean);

    if (items.length >= 2) {
        return {...rowObject, items};
    } else if (items.length == 1) {
        // Dissolve the row object - become whatever is inside
        return items[0];
    }
}

function minimizeStack(stackObject) {
    // Minimize items inside first, and save only the truthy ones
    const items = stackObject.items.map(minimizeGeneric).filter(Boolean);

    if (items.length >= 1) {
        return {...stackObject, items};
    }
}

export {isGenericMinimal as isLayoutMinimal};
export {minimizeGeneric as minimizeLayout};

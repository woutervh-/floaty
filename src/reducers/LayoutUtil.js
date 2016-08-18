function minimizeRowOrColumn(object, rowOrColumn) {
    // Filter falsy items and merge child rows/columns with this row/column
    const items = [];
    const growValues = [];
    for (let i = 0; i < object.items.length; i++) {
        const item = object.items[i];
        if (!!item) {
            const growValue = 'growValues' in object && object.growValues[i] || 1;
            if (item.type == rowOrColumn) {
                let growValuesSum = 0;
                for (let j = 0; j < item.items.length; j++) {
                    growValuesSum += 'growValues' in item && item.growValues[j] || 1;
                }
                for (let j = 0; j < item.items.length; j++) {
                    const childItem = item.items[j];
                    const childGrowValue = 'growValues' in item && item.growValues[j] || 1;
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
        return {...object, items, growValues};
    } else if (items.length == 1) {
        // Dissolve the row/column object - become whatever is inside
        return items[0];
    }
}

export function minimizeColumn(columnObject) {
    console.log('minimizing')
    console.log(columnObject)
    return minimizeRowOrColumn(columnObject, 'column');
}

export function minimizeRow(rowObject) {
    return minimizeRowOrColumn(rowObject, 'row');
}

export function minimizeStack(stackObject) {
    // Filter falsy items
    const items = stackObject.items.filter(Boolean);

    if (stackObject.items.length >= 1) {
        return {...stackObject, items};
    }
}

export function transformToColumn(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return {type: 'column', items: [...items, object]};
    } else {
        return {type: 'column', items: [object, ...items]};
    }
}

export function transformToRow(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return {type: 'row', items: [...items, object]};
    } else {
        return {type: 'row', items: [object, ...items]};
    }
}

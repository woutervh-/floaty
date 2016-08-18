export function minimizeRow(rowObject) {
    // Filter falsy items and merge child rows with this row
    const items = [];
    const growValues = [];
    for (let i = 0; i < rowObject.items.length; i++) {
        const item = rowObject.items[i];
        if (!!item) {
            const growValue = 'growValues' in rowObject && rowObject.growValues[i] || 1;
            if (item.type == 'row') {
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

    console.log('minimized growValues')
    console.log(growValues)

    if (rowObject.items.length >= 2) {
        return {...rowObject, items, growValues};
    } else if (rowObject.items.length == 1) {
        // Dissolve the row object - become whatever is inside
        return rowObject.items[0];
    }
}

export function minimizeStack(stackObject) {
    // Filter falsy items
    const items = stackObject.items.filter(Boolean);

    if (stackObject.items.length >= 1) {
        return {...stackObject, items};
    }
}

export function transformToRow(object, items, newItemsBefore) {
    if (newItemsBefore) {
        return {type: 'row', items: [...items, object]};
    } else {
        return {type: 'row', items: [object, ...items]};
    }
}

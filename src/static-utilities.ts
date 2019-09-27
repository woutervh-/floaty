import * as ReactManagedDragable from 'react-managed-draggable';
import * as DropModel from './drop-model';
import * as StateModel from './state-model';

type TraverseOrder = 'pre-order' | 'post-order';

export class StaticUtilities {
    public static traverseLayoutTree<T>(layout: StateModel.Layout<T>, callback: (node: StateModel.Layout<T>) => void, order: TraverseOrder) {
        if (order === 'pre-order') {
            callback(layout);
        }
        if (layout.type !== 'stack') {
            for (const item of layout.items) {
                StaticUtilities.traverseLayoutTree(item.child, callback, order);
            }
        }
        if (order === 'post-order') {
            callback(layout);
        }
    }

    public static minimizeLayout<T>(layout: StateModel.Layout<T> | null): StateModel.Layout<T> | null {
        if (layout === null) {
            return null;
        }
        switch (layout.type) {
            case 'column':
            case 'row': {
                const type = layout.type;
                const items: StateModel.ColumnOrRowItem<T>[] = [];
                let changed = false;
                for (const item of layout.items) {
                    const result = this.minimizeLayout(item.child);
                    if (result !== item.child) {
                        changed = true;
                    }
                    if (result) {
                        if (result.type === type) {
                            const childSumFractions = result.items.map((item) => item.fraction).reduce((sum, fraction) => sum + fraction);
                            const normalizedChildFractions = result.items.map((item) => item.fraction / childSumFractions);
                            for (let i = 0; i < result.items.length; i++) {
                                items.push({ ...result.items[i], fraction: normalizedChildFractions[i] * item.fraction });
                            }
                            changed = true;
                        } else {
                            items.push({ ...item, child: result });
                        }
                    }
                }
                if (items.length >= 2) {
                    if (changed) {
                        // Normalize fractions.
                        const fractionSum = items.reduce((sum, item) => sum + item.fraction, 0);
                        const normalizedItems = items.map((item) => {
                            return {
                                ...item,
                                fraction: item.fraction / fractionSum
                            };
                        });
                        return { ...layout, items: normalizedItems };
                    } else {
                        return layout;
                    }
                } else if (items.length === 1) {
                    return items[0].child;
                } else {
                    return null;
                }
            }
            case 'stack': {
                if (layout.items.length >= 1) {
                    return layout;
                } else {
                    return null;
                }
            }
        }
    }

    public static findStackItem<T>(predicate: (item: T) => boolean, layout: StateModel.Layout<T>): StateModel.StackItem<T> | null {
        if (layout.type === 'stack') {
            for (const item of layout.items) {
                if (predicate(item.item)) {
                    return item;
                }
            }
        } else {
            for (const item of layout.items) {
                const found = StaticUtilities.findStackItem(predicate, item.child);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    public static findStack<T>(stackItem: StateModel.StackItem<T>, from: StateModel.Layout<T> | null): StateModel.Stack<T> | null {
        if (from === null) {
            return null;
        }
        switch (from.type) {
            case 'column':
            case 'row': {
                for (const item of from.items) {
                    const found = StaticUtilities.findStack(stackItem, item.child);
                    if (found) {
                        return found;
                    }
                }
                break;
            }
            case 'stack': {
                for (const item of from.items) {
                    if (stackItem === item) {
                        return from;
                    }
                }
                break;
            }
        }
        return null;
    }

    public static getContentResolutionSide(resolution: DropModel.DropResolutionContainer<unknown>, mousePosition: ReactManagedDragable.XY): 'left' | 'right' | 'top' | 'bottom' {
        if (mousePosition.x <= resolution.dropArea.left + resolution.dropArea.width * 0.2) {
            return 'left';
        } else if (mousePosition.x >= resolution.dropArea.left + resolution.dropArea.width * 0.8) {
            return 'right';
        } else if (mousePosition.y <= resolution.dropArea.top + resolution.dropArea.height * 0.5) {
            return 'top';
        } else {
            return 'bottom';
        }
    }
}

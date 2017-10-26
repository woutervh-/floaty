"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
function minimizeColumnOrRow(itemId, floatyItems, minimized, type) {
    var items = [];
    var growValues = [];
    var self = floatyItems[itemId];
    for (var i = 0; i < self.items.length; i++) {
        var child = self.items[i];
        var childItem = minimize(child, floatyItems, minimized);
        if (childItem !== undefined) {
            var growValue = self.growValues && self.growValues[i] || 1;
            if (floatyItems[childItem].type === type) {
                var growValuesSum = 0;
                for (var j = 0; j < floatyItems[childItem].items.length; j++) {
                    var childGrowValues = floatyItems[childItem].growValues;
                    if (childGrowValues) {
                        growValuesSum += childGrowValues[j];
                    }
                    else {
                        growValuesSum += 1;
                    }
                }
                for (var j = 0; j < floatyItems[childItem].items.length; j++) {
                    var childGrowValue = void 0;
                    var childGrowValues = floatyItems[childItem].growValues;
                    if (childGrowValues) {
                        childGrowValue = childGrowValues[j];
                    }
                    else {
                        childGrowValue = 1;
                    }
                    items.push(floatyItems[childItem].items[j]);
                    growValues.push(growValue * childGrowValue / growValuesSum);
                }
            }
            else {
                items.push(childItem);
                growValues.push(growValue);
            }
        }
    }
    if (items.length >= 2) {
        floatyItems[itemId] = __assign({}, self, { items: items, growValues: growValues });
        return itemId;
    }
    else if (items.length === 1) {
        return items[0];
    }
}
function minimizeStack(itemId, floatyItems, minimized) {
    var items = [];
    var titles = [];
    var self = floatyItems[itemId];
    for (var i = 0; i < self.items.length; i++) {
        var child = self.items[i];
        var childItem = minimize(child, floatyItems, minimized);
        var title = self.titles[i];
        var titleItem = minimize(title, floatyItems, minimized);
        if (childItem !== undefined && titleItem !== undefined) {
            items.push(childItem);
            titles.push(titleItem);
        }
    }
    if (items.length >= 1) {
        floatyItems[itemId] = __assign({}, self, { active: self.active, items: items, titles: titles });
        return itemId;
    }
}
function minimize(item, floatyItems, minimized) {
    if (!(item in minimized)) {
        switch (floatyItems[item].type) {
            case 'column':
                minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'column');
                break;
            case 'row':
                minimized[item] = minimizeColumnOrRow(item, floatyItems, minimized, 'row');
                break;
            case 'stack':
                minimized[item] = minimizeStack(item, floatyItems, minimized);
                break;
            default:
                minimized[item] = item;
        }
    }
    return minimized[item];
}
function columnOrRow(state, action) {
    switch (action.type) {
        case constants_1.FLOATY_SET_GROW_VALUES:
            return __assign({}, state, { growValues: action.growValues });
        default:
            return state;
    }
}
function stack(state, action) {
    if (state === void 0) { state = { type: 'stack', active: 0, titles: [], items: [] }; }
    switch (action.type) {
        case constants_1.FLOATY_REMOVE_TAB: {
            var items = state.items.slice();
            items.splice(action.index, 1);
            var titles = state.titles.slice();
            titles.splice(action.index, 1);
            if (state.active !== undefined) {
                // Ensure active index is in range
                var active = Math.min(items.length - 1, state.active);
                return __assign({}, state, { active: active, items: items, titles: titles });
            }
            else {
                return __assign({}, state, { items: items, titles: titles });
            }
        }
        case constants_1.FLOATY_REMOVE_ACTIVE_TAB: {
            var items = state.items.slice();
            items.splice(state.active, 1);
            var titles = state.titles.slice();
            titles.splice(state.active, 1);
            if (state.active !== undefined) {
                // Ensure active index is in range
                var active = Math.min(items.length - 1, state.active);
                return __assign({}, state, { active: active, items: items, titles: titles });
            }
            else {
                return __assign({}, state, { items: items, titles: titles });
            }
        }
        case constants_1.FLOATY_INSERT_TAB: {
            var items = state.items.slice();
            items.splice(action.index, 0, action.item);
            var titles = state.titles.slice();
            titles.splice(action.index, 0, action.title);
            return __assign({}, state, { items: items, titles: titles });
        }
        case constants_1.FLOATY_ADD_TAB: {
            var items = state.items.concat([action.item]);
            var titles = state.titles.concat([action.title]);
            return __assign({}, state, { active: items.length - 1, items: items, titles: titles });
        }
        case constants_1.FLOATY_SET_ACTIVE_TAB:
            return __assign({}, state, { active: action.index });
        default:
            return state;
    }
}
function floatyItem(state, action) {
    switch (action.type) {
        case constants_1.FLOATY_REMOVE_TAB:
        case constants_1.FLOATY_REMOVE_ACTIVE_TAB:
        case constants_1.FLOATY_INSERT_TAB:
        case constants_1.FLOATY_ADD_TAB:
        case constants_1.FLOATY_SET_ACTIVE_TAB:
            return stack(state, action);
        case constants_1.FLOATY_TRANSFORM_INTO_COLUMN:
            return { type: 'column', items: action.items };
        case constants_1.FLOATY_TRANSFORM_INTO_ROW:
            return { type: 'row', items: action.items };
        case constants_1.FLOATY_SET_GROW_VALUES:
            return columnOrRow(state, action);
        case constants_1.FLOATY_ADD_ITEM:
            return action.item;
        case constants_1.FLOATY_SET_ITEM_STATE:
            return __assign({}, state, { state: action.state });
        default:
            return state;
    }
}
function floatyItems(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case constants_1.FLOATY_REMOVE_TAB:
        case constants_1.FLOATY_REMOVE_ACTIVE_TAB:
        case constants_1.FLOATY_INSERT_TAB:
        case constants_1.FLOATY_ADD_TAB:
        case constants_1.FLOATY_SET_ACTIVE_TAB:
        case constants_1.FLOATY_SET_GROW_VALUES:
        case constants_1.FLOATY_ADD_ITEM:
        case constants_1.FLOATY_SET_ITEM_STATE:
            return __assign({}, state, (_a = {}, _a[action.itemId] = floatyItem(state[action.itemId], action), _a));
        case constants_1.FLOATY_TRANSFORM_INTO_COLUMN:
        case constants_1.FLOATY_TRANSFORM_INTO_ROW: {
            var _b = action, itemId = _b.itemId, newItemsBefore = _b.newItemsBefore;
            var _c = [action.newId1, action.newId2], id1 = _c[0], id2 = _c[1];
            if (newItemsBefore) {
                return __assign({}, state, (_d = {}, _d[itemId] = floatyItem(state[itemId], { type: action.type, items: [id1, id2] }), _d[id1] = action.item, _d[id2] = state[itemId], _d));
            }
            else {
                return __assign({}, state, (_e = {}, _e[itemId] = floatyItem(state[itemId], { type: action.type, items: [id1, id2] }), _e[id1] = state[itemId], _e[id2] = action.item, _e));
            }
        }
        case constants_1.FLOATY_SET_LAYOUT:
            return __assign({}, state, (_f = {}, _f[action.itemId] = action.item, _f));
        default:
            return state;
    }
    var _a, _d, _e, _f;
}
function floatyLayout(state, action) {
    if (state === void 0) { state = { item: '0', floatingItem: null, floatingTitle: null }; }
    switch (action.type) {
        case constants_1.FLOATY_START_FLOATING:
            return __assign({}, state, { floatingItem: action.item, floatingTitle: action.title });
        case constants_1.FLOATY_STOP_FLOATING:
            return __assign({}, state, { floatingItem: null, floatingTitle: null });
        case constants_1.FLOATY_SET_LAYOUT:
            return __assign({}, state, { item: action.itemId });
        default:
            return state;
    }
}
function floatyLayouts(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case constants_1.FLOATY_START_FLOATING:
        case constants_1.FLOATY_STOP_FLOATING:
        case constants_1.FLOATY_SET_LAYOUT:
            return __assign({}, state, (_a = {}, _a[action.layoutId] = floatyLayout(state[action.layoutId], action), _a));
        default:
            return state;
    }
    var _a;
}
function sweep(items, marked) {
    for (var _i = 0, _a = Object.keys(items); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!(key in marked)) {
            delete items[key];
        }
    }
}
function floaty(state, action) {
    if (state === void 0) { state = { items: {}, layouts: {} }; }
    switch (action.type) {
        case constants_1.FLOATY_SET_LAYOUT:
        case constants_1.FLOATY_REMOVE_TAB:
        case constants_1.FLOATY_REMOVE_ACTIVE_TAB:
        case constants_1.FLOATY_INSERT_TAB:
        case constants_1.FLOATY_ADD_TAB:
        case constants_1.FLOATY_SET_ACTIVE_TAB:
        case constants_1.FLOATY_SET_GROW_VALUES:
        case constants_1.FLOATY_TRANSFORM_INTO_COLUMN:
        case constants_1.FLOATY_TRANSFORM_INTO_ROW:
        case constants_1.FLOATY_START_FLOATING:
        case constants_1.FLOATY_STOP_FLOATING:
        case constants_1.FLOATY_ADD_ITEM:
            var items = state.items, layouts = state.layouts;
            var next_1 = {
                items: __assign({}, floatyItems(items, action)),
                layouts: __assign({}, floatyLayouts(layouts, action))
            };
            var minimized_1 = {};
            Object.keys(next_1.layouts).forEach(function (key) {
                var layout = next_1.layouts[key];
                var item = layout.item, floatingItem = layout.floatingItem, floatingTitle = layout.floatingTitle;
                if (item !== undefined) {
                    layout.item = minimize(item, next_1.items, minimized_1);
                }
                if (floatingItem) {
                    layout.floatingItem = minimize(floatingItem, next_1.items, minimized_1) || null;
                }
                if (floatingTitle) {
                    layout.floatingTitle = minimize(floatingTitle, next_1.items, minimized_1) || null;
                }
            });
            if (action.meta && action.meta.floaty && action.meta.floaty.sweep === true) {
                sweep(next_1.items, minimized_1);
            }
            return next_1;
        default:
            return state;
    }
}
exports.default = floaty;
//# sourceMappingURL=index.js.map
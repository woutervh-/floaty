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
var actions_1 = require("./actions");
var DomUtil = require("./DomUtil");
function split(element, position, id, dispatch) {
    var box = DomUtil.elementOffset(element);
    var leftBox = __assign({}, box, { width: 0.2 * box.width });
    var rightBox = __assign({}, box, { x: box.x + box.width * 0.8, width: 0.2 * box.width });
    var topBox = __assign({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5 });
    var bottomBox = __assign({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5 });
    if (DomUtil.isWithinBox(position, leftBox)) {
        // Make row here: floating content to the left, original content to the right
        return __assign({}, box, { width: box.width / 2, execute: function (item, title) { return dispatch(actions_1.transformIntoRow(id, { type: 'stack', items: [item], titles: [title] }, true)); }, resolved: true });
    }
    if (DomUtil.isWithinBox(position, rightBox)) {
        // Make row here: floating content to the right, original content to the left
        return __assign({}, box, { x: box.x + box.width / 2, width: box.width / 2, execute: function (item, title) { return dispatch(actions_1.transformIntoRow(id, { type: 'stack', items: [item], titles: [title] }, false)); }, resolved: true });
    }
    if (DomUtil.isWithinBox(position, topBox)) {
        return __assign({}, box, { height: box.height / 2, execute: function (item, title) { return dispatch(actions_1.transformIntoColumn(id, { type: 'stack', items: [item], titles: [title] }, true)); }, resolved: true });
    }
    if (DomUtil.isWithinBox(position, bottomBox)) {
        return __assign({}, box, { y: box.y + box.height / 2, height: box.height / 2, execute: function (item, title) { return dispatch(actions_1.transformIntoColumn(id, { type: 'stack', items: [item], titles: [title] }, false)); }, resolved: true });
    }
    return { x: 0, y: 0, width: 0, height: 0, resolved: false };
}
exports.default = split;
;
//# sourceMappingURL=split.js.map
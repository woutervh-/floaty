"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.elementOffset = elementOffset;
exports.isWithinBox = isWithinBox;
function elementOffset(element) {
    var elementOffset = { x: element.offsetLeft, y: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight };
    var parent = element.offsetParent;
    while (parent != null) {
        elementOffset.x += parent.offsetLeft;
        elementOffset.y += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return elementOffset;
}

function isWithinBox(point, box) {
    return box.x <= point.x && point.x <= box.x + box.width && box.y <= point.y && point.y <= box.y + box.height;
}
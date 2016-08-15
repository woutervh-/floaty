"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    elementOffset: function elementOffset(element) {
        var elementOffset = { x: element.offsetLeft, y: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight };
        var parent = element.offsetParent;
        while (parent != null) {
            elementOffset.x += parent.offsetLeft;
            elementOffset.y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return elementOffset;
    }
};
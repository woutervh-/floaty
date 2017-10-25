"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getPosition(event) {
    if ('touches' in event) {
        if (event.touches.length >= 1) {
            return { x: event.touches[0].pageX, y: event.touches[0].pageY };
        }
        else {
            return { x: 0, y: 0 };
        }
    }
    else {
        return { x: event.pageX, y: event.pageY };
    }
}
exports.default = getPosition;
//# sourceMappingURL=getPosition.js.map
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Draggable;

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _getPosition = require('./getPosition');

var _getPosition2 = _interopRequireDefault(_getPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Draggable(element) {
    var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var emitter = new _eventemitter2.default();
    var down = false;
    var dragging = false;
    var start = { x: 0, y: 0 };
    var current = { x: 0, y: 0 };

    function distance(a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    }

    function handleUp(event) {
        if (down) {
            down = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);

            if (dragging) {
                dragging = false;
                current = (0, _getPosition2.default)(event);
                emitter.emit('dragstop', { dx: current.x - start.x, dy: current.y - start.y, position: current, originalEvent: event });
            }
        }
    }

    function handleMove(event) {
        if (down) {
            current = (0, _getPosition2.default)(event);

            if (!dragging) {
                if (distance(start, current) >= threshold) {
                    dragging = true;
                    emitter.emit('dragstart', { position: start, originalEvent: event });
                    emitter.emit('drag', { dx: current.x - start.x, dy: current.y - start.y, position: current, originalEvent: event });
                }
            } else {
                emitter.emit('drag', { dx: current.x - start.x, dy: current.y - start.y, position: current, originalEvent: event });
            }
        }
    }

    function handleDown(event) {
        if (!down && !dragging) {
            down = true;
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchend', handleUp);
            current = start = (0, _getPosition2.default)(event);

            if (threshold <= 0) {
                dragging = true;
                emitter.emit('dragstart', { position: current, originalEvent: event });
            }
        }
    }

    element.addEventListener('mousedown', handleDown);
    element.addEventListener('touchstart', handleDown);

    emitter.on('destroy', function () {
        element.removeEventListener('mousedown', handleDown);
        element.removeEventListener('touchstart', handleDown);
        if (down) {
            down = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);
        }
        emitter.emit('destroyed');
    });

    return emitter;
};
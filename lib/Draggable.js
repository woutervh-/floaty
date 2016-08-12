'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Draggable;

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Draggable(element) {
    var emitter = new _eventemitter2.default();
    var dragging = false;
    var start = { x: 0, y: 0 };

    function handleUp(event) {
        if (dragging) {
            dragging = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);

            var current = { x: event.pageX, y: event.pageY };
            emitter.emit('dragstop', { x: current.x - start.x, y: current.y - start.y });
        }
    }

    function handleMove(event) {
        if (dragging) {
            var current = { x: event.pageX, y: event.pageY };
            emitter.emit('drag', { x: current.x - start.x, y: current.y - start.y });
        }
    }

    function handleDown(event) {
        if (!dragging) {
            dragging = true;
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchend', handleUp);

            start = { x: event.pageX, y: event.pageY };
            emitter.emit('dragstart');
        }
    }

    element.addEventListener('mousedown', handleDown);
    element.addEventListener('touchstart', handleDown);

    emitter.on('destroy', function () {
        element.removeEventListener('mousedown', handleDown);
        element.removeEventListener('touchstart', handleDown);
        if (dragging) {
            dragging = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);
        }
        emitter.emit('destroyed');
    });

    return emitter;
};
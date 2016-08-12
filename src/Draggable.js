import EventEmitter from 'eventemitter3';

export default function Draggable(element) {
    const emitter = new EventEmitter();
    let dragging = false;
    let start = {x: 0, y: 0};

    function handleUp(event) {
        if (dragging) {
            dragging = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);

            const current = {x: event.pageX, y: event.pageY};
            emitter.emit('dragstop', {x: current.x - start.x, y: current.y - start.y});
        }
    }

    function handleMove(event) {
        if (dragging) {
            const current = {x: event.pageX, y: event.pageY};
            emitter.emit('drag', {x: current.x - start.x, y: current.y - start.y});
        }
    }

    function handleDown(event) {
        if (!dragging) {
            dragging = true;
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('touchmove', handleMove);
            document.addEventListener('mouseup', handleUp);
            document.addEventListener('touchend', handleUp);

            start = {x: event.pageX, y: event.pageY};
            emitter.emit('dragstart');
        }
    }

    element.addEventListener('mousedown', handleDown);
    element.addEventListener('touchstart', handleDown);

    emitter.on('destroy', () => {
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

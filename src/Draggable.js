import EventEmitter from 'eventemitter3';

export default function Draggable(element) {
    const emitter = new EventEmitter();
    let dragging = false;
    let start = {x: 0, y: 0};
    let current = {x: 0, y: 0};

    function getPosition(event) {
        if ('touches' in event) {
            if (event.touches.length >= 1) {
                return {x: event.touches[0].pageX, y: event.touches[0].pageY};
            } else {
                return current;
            }
        } else {
            return {x: event.pageX, y: event.pageY};
        }
    }

    function handleUp(event) {
        if (dragging) {
            dragging = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchend', handleUp);

            current = getPosition(event);
            emitter.emit('dragstop', {x: current.x - start.x, y: current.y - start.y});
        }
    }

    function handleMove(event) {
        if (dragging) {
            current = getPosition(event);
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

            current = start = getPosition(event);
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

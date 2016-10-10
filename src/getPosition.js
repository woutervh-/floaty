export default function getPosition(event) {
    if (typeof event.touches !== 'undefined') {
        if (event.touches.length >= 1) {
            return {x: event.touches[0].pageX, y: event.touches[0].pageY};
        }
    } else {
        return {x: event.pageX, y: event.pageY};
    }
}

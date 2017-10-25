export default function getPosition(event: MouseEvent | TouchEvent): {x: number, y: number} {
    if('touches' in event) {
        if ((event as TouchEvent).touches.length >= 1) {
            return {x: (event as TouchEvent).touches[0].pageX, y: (event as TouchEvent).touches[0].pageY};
        } else {
            return {x: 0, y: 0};
        }
    } else {
        return {x: (event as MouseEvent).pageX, y: (event as MouseEvent).pageY};
    }
}

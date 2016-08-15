export default {
    elementOffset(element) {
        const elementOffset = {x: element.offsetLeft, y: element.offsetTop, width: element.offsetWidth, height: element.offsetHeight};
        let parent = element.offsetParent;
        while (parent != null) {
            elementOffset.x += parent.offsetLeft;
            elementOffset.y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return elementOffset;
    }
};

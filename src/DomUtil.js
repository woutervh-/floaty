export default {
    elementOffset(element) {
        const elementOffset = {x: element.offsetLeft, y: element.offsetTop};
        let parent = element.offsetParent;
        while (parent != null) {
            elementOffset.x += parent.offsetLeft;
            elementOffset.y += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return elementOffset;
    }
};

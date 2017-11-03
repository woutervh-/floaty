import { transformIntoColumn, transformIntoRow } from './actions';
import * as DomUtil from './DomUtil';
export default function split(element, position, id, dispatch) {
    const box = DomUtil.elementOffset(element);
    const leftBox = Object.assign({}, box, { width: 0.2 * box.width });
    const rightBox = Object.assign({}, box, { x: box.x + box.width * 0.8, width: 0.2 * box.width });
    const topBox = Object.assign({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5 });
    const bottomBox = Object.assign({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5 });
    if (DomUtil.isWithinBox(position, leftBox)) {
        // Make row here: floating content to the left, original content to the right
        return Object.assign({}, box, { width: box.width / 2, execute: (item, title) => dispatch(transformIntoRow(id, { type: 'stack', items: [item], titles: [title] }, true)), resolved: true });
    }
    if (DomUtil.isWithinBox(position, rightBox)) {
        // Make row here: floating content to the right, original content to the left
        return Object.assign({}, box, { x: box.x + box.width / 2, width: box.width / 2, execute: (item, title) => dispatch(transformIntoRow(id, { type: 'stack', items: [item], titles: [title] }, false)), resolved: true });
    }
    if (DomUtil.isWithinBox(position, topBox)) {
        return Object.assign({}, box, { height: box.height / 2, execute: (item, title) => dispatch(transformIntoColumn(id, { type: 'stack', items: [item], titles: [title] }, true)), resolved: true });
    }
    if (DomUtil.isWithinBox(position, bottomBox)) {
        return Object.assign({}, box, { y: box.y + box.height / 2, height: box.height / 2, execute: (item, title) => dispatch(transformIntoColumn(id, { type: 'stack', items: [item], titles: [title] }, false)), resolved: true });
    }
    return { x: 0, y: 0, width: 0, height: 0, resolved: false };
}
;
//# sourceMappingURL=split.js.map
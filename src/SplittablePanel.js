import React from 'react';
import ReactDOM from 'react-dom';
import DomUtil from './DomUtil';
import {noOperation, transformIntoRow, transformIntoColumn} from './actions';

export default class SplittablePanel extends React.Component {
    dispatch(action) {
        throw new Error('This method is abstract');
    }

    transformChildren() {
        const {children} = this.props;
        if (React.Children.count(children) == 1) {
            const child = React.Children.toArray(children)[0];
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {ref: 'content'});
            } else {
                return children;
            }
        } else {
            return children;
        }
    }

    split(position) {
        const element = ReactDOM.findDOMNode(this.refs['container']);
        const box = DomUtil.elementOffset(element);
        const leftBox = {...box, width: 0.2 * box.width};
        const rightBox = {...box, x: box.x + box.width * 0.8, width: 0.2 * box.width};
        const topBox = {...box, x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5};
        const bottomBox = {...box, x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5};
        if (DomUtil.isWithinBox(position, leftBox)) {
            // Make row here: floating content to the left, original content to the right
            return {...box, width: box.width / 2, dispatch: (item, name) => this.dispatch(transformIntoRow([{type: 'stack', names: [name], items: [item]}], true)), resolved: true};
        }
        if (DomUtil.isWithinBox(position, rightBox)) {
            // Make row here: floating content to the right, original content to the left
            return {...box, x: box.x + box.width / 2, width: box.width / 2, dispatch: (item, name) => this.dispatch(transformIntoRow([{type: 'stack', names: [name], items: [item]}], false)), resolved: true};
        }
        if (DomUtil.isWithinBox(position, topBox)) {
            return {...box, height: box.height / 2, dispatch: (item, name) => this.dispatch(transformIntoColumn([{type: 'stack', names: [name], items: [item]}], true)), resolved: true};
        }
        if (DomUtil.isWithinBox(position, bottomBox)) {
            return {...box, y: box.y + box.height / 2, height: box.height / 2, dispatch: (item, name) => this.dispatch(transformIntoColumn([{type: 'stack', names: [name], items: [item]}], false)), resolved: true};
        }
        return {x: 0, y: 0, width: 0, height: 0, dispatch: noOperation, resolved: false};
    }

    resolveDropArea(position) {
        const {children} = this.props;
        if (React.Children.count(children) == 1) {
            if ('resolveDropArea' in this.refs['content']) {
                return this.refs['content'].resolveDropArea(position);
            } else {
                // We were passed content
                return this.split(position);
            }
        } else {
            // We were passed multiple children by the user - there is no Row/Column/Stack inside here, just content
            return this.split(position);
        }
    }
}

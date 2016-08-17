import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import Stack from './Stack';
import DomUtil from './DomUtil';
import {noOperation} from './actions';

export default class GenericContent extends React.Component {
    transformChildren() {
        const {children} = this.props;
        if (React.Children.count(children) == 1) {
            const child = React.Children.toArray(children)[0];
            switch (child.type) {
                case Row:
                case Stack:
                    return React.cloneElement(child, {ref: 'content'});
                default:
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
            return {...box, width: box.width / 2, action: noOperation, resolved: true};
        }
        if (DomUtil.isWithinBox(position, rightBox)) {
            return {...box, x: box.x + box.width / 2, width: box.width / 2, action: noOperation, resolved: true};
        }
        if (DomUtil.isWithinBox(position, topBox)) {
            return {...box, height: box.height / 2, action: noOperation, resolved: true};
        }
        if (DomUtil.isWithinBox(position, bottomBox)) {
            return {...box, y: box.y + box.height / 2, height: box.height / 2, action: noOperation, resolved: true};
        }
        throw new Error('Hmm...');
    }

    resolveDropArea(position) {
        const {children} = this.props;
        if (React.Children.count(children) == 1) {
            const {type} = React.Children.toArray(children)[0];
            switch (type) {
                case Row:
                case Stack:
                    return this.refs['content'].resolveDropArea(position);
                default:
                    // We were passed content
                    return this.split(position);
            }
        } else {
            // We were passed multiple children by the user - there is no Row/Stack inside here, just content
            return this.split(position);
        }
    }
}

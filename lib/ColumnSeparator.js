import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowEqual from 'shallowequal';
import Draggable from './Draggable';
import { floatyContextType } from './Types';
export class ColumnSeparator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            offset: 0
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context, nextContext);
    }
    componentDidMount() {
        this.draggable = Draggable(ReactDOM.findDOMNode(this));
        this.draggable.on('dragstart', () => this.handleDragStart());
        this.draggable.on('drag', (event) => this.handleDrag(event));
        this.draggable.on('dragstop', () => this.handleDragStop());
    }
    componentWillUnmount() {
        this.draggable.emit('destroy');
    }
    clampOffset(offset) {
        const { min, max } = this.props.getBounds();
        return Math.min(max, Math.max(min, offset));
    }
    handleDragStart() {
        const { floatyContext: { theme } } = this.context;
        document.body.classList.add(theme['floaty-unselectable']);
    }
    handleDrag(event) {
        this.setState({ offset: this.clampOffset(event.dy) });
    }
    handleDragStop() {
        const { floatyContext: { theme } } = this.context;
        document.body.classList.remove(theme['floaty-unselectable']);
        this.props.onPositionChange(this.state.offset);
        this.setState({ offset: 0 });
    }
    render() {
        const { className, onPositionChange } = this.props;
        const { offset } = this.state;
        const { floatyContext: { theme } } = this.context;
        return React.createElement("div", { className: classNames(theme['floaty-column-separator'], className), style: { top: offset } });
    }
}
ColumnSeparator.contextTypes = {
    floatyContext: floatyContextType
};
//# sourceMappingURL=ColumnSeparator.js.map
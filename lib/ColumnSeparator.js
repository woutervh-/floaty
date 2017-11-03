"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const classnames_1 = require("classnames");
const shallowequal_1 = require("shallowequal");
const Draggable_1 = require("./Draggable");
const Types_1 = require("./Types");
class ColumnSeparator extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            offset: 0
        };
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowequal_1.default(this.props, nextProps) || !shallowequal_1.default(this.state, nextState) || !shallowequal_1.default(this.context, nextContext);
    }
    componentDidMount() {
        this.draggable = Draggable_1.default(ReactDOM.findDOMNode(this));
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
        return React.createElement("div", { className: classnames_1.default(theme['floaty-column-separator'], className), style: { top: offset } });
    }
}
ColumnSeparator.contextTypes = {
    floatyContext: Types_1.floatyContextType
};
exports.ColumnSeparator = ColumnSeparator;
//# sourceMappingURL=ColumnSeparator.js.map
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var classNames = require("classnames");
var shallowEqual = require("shallowequal");
var Draggable_1 = require("./Draggable");
var Types_1 = require("./Types");
var ColumnSeparator = /** @class */ (function (_super) {
    __extends(ColumnSeparator, _super);
    function ColumnSeparator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            offset: 0
        };
        return _this;
    }
    ColumnSeparator.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState) || !shallowEqual(this.context, nextContext);
    };
    ColumnSeparator.prototype.componentDidMount = function () {
        var _this = this;
        this.draggable = Draggable_1.default(ReactDOM.findDOMNode(this));
        this.draggable.on('dragstart', function () { return _this.handleDragStart(); });
        this.draggable.on('drag', function (event) { return _this.handleDrag(event); });
        this.draggable.on('dragstop', function () { return _this.handleDragStop(); });
    };
    ColumnSeparator.prototype.componentWillUnmount = function () {
        this.draggable.emit('destroy');
    };
    ColumnSeparator.prototype.clampOffset = function (offset) {
        var _a = this.props.getBounds(), min = _a.min, max = _a.max;
        return Math.min(max, Math.max(min, offset));
    };
    ColumnSeparator.prototype.handleDragStart = function () {
        var theme = this.context.floatyContext.theme;
        document.body.classList.add(theme['floaty-unselectable']);
    };
    ColumnSeparator.prototype.handleDrag = function (event) {
        this.setState({ offset: this.clampOffset(event.dy) });
    };
    ColumnSeparator.prototype.handleDragStop = function () {
        var theme = this.context.floatyContext.theme;
        document.body.classList.remove(theme['floaty-unselectable']);
        this.props.onPositionChange(this.state.offset);
        this.setState({ offset: 0 });
    };
    ColumnSeparator.prototype.render = function () {
        var _a = this.props, className = _a.className, onPositionChange = _a.onPositionChange;
        var offset = this.state.offset;
        var theme = this.context.floatyContext.theme;
        return React.createElement("div", { className: classNames(theme['floaty-column-separator'], className), style: { top: offset } });
    };
    ColumnSeparator.contextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return ColumnSeparator;
}(React.Component));
exports.ColumnSeparator = ColumnSeparator;
//# sourceMappingURL=ColumnSeparator.js.map
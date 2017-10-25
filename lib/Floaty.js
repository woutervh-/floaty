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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var shallowEqual = require("shallowequal");
var react_redux_1 = require("react-redux");
var Item_1 = require("./Item");
var actions_1 = require("./actions");
var selectors_1 = require("./selectors");
var Types_1 = require("./Types");
var getPosition_1 = require("./getPosition");
var StackFloating_1 = require("./StackFloating");
var DomUtil = require("./DomUtil");
var navigator_1 = require("./navigator");
var Floaty = /** @class */ (function (_super) {
    __extends(Floaty, _super);
    function Floaty() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            x: 0,
            y: 0,
            targetIndicator: {
                top: 0,
                left: 0,
                width: 0,
                height: 0
            },
            showTargetIndicator: false
        };
        _this.handleMove = function (event) {
            var isFloating = _this.props.isFloating;
            if (isFloating) {
                var _a = getPosition_1.default(event), x = _a.x, y = _a.y;
                var _b = _this.resolveDropArea({ x: x, y: y }), left = _b.x, top_1 = _b.y, width = _b.width, height = _b.height, resolved = _b.resolved;
                if (resolved) {
                    _this.setState({ x: x, y: y, showTargetIndicator: true, targetIndicator: { top: top_1, left: left, width: width, height: height } });
                }
                else {
                    _this.setState({ x: x, y: y, showTargetIndicator: false });
                }
            }
        };
        _this.handleUp = function () {
            var isFloating = _this.props.isFloating;
            if (isFloating) {
                var _a = _this.props, dispatch = _a.dispatch, id = _a.id, theme = _a.theme;
                var _b = _this.state, x = _b.x, y = _b.y;
                document.body.classList.remove(theme['floaty-unselectable']);
                var resolution = _this.resolveDropArea({ x: x, y: y });
                var _c = _this.props, floatingItem = _c.floatingItem, floatingTitle = _c.floatingTitle, floaty = _c.floaty, onClose = _c.onClose;
                if (floatingItem !== null && floatingTitle !== null) {
                    if (resolution.resolved && resolution.execute !== undefined) {
                        resolution.execute(floatingItem, floatingTitle);
                        dispatch(actions_1.stopFloating(id));
                    }
                    else {
                        dispatch(actions_1.stopFloating(id));
                        if (onClose) {
                            onClose(floaty.items[floatingItem] || floatingItem, floaty.items[floatingTitle] || floatingTitle);
                        }
                    }
                }
            }
        };
        _this.dragStart = function (item, title) {
            var _a = _this.props, dispatch = _a.dispatch, id = _a.id, theme = _a.theme;
            dispatch(actions_1.startFloating(id, item, title));
            document.body.classList.add(theme['floaty-unselectable']);
        };
        return _this;
    }
    Floaty.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    };
    Floaty.prototype.componentWillMount = function () {
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handleUp);
    };
    Floaty.prototype.componentWillUnmount = function () {
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
    };
    Floaty.prototype.getChildContext = function () {
        return {
            floatyContext: {
                float: this.dragStart,
                refs: this.props.refs,
                theme: this.props.theme
            }
        };
    };
    Floaty.prototype.navigator = function () {
        var _a = this.props, floaty = _a.floaty, id = _a.id;
        return navigator_1.default(floaty, id);
    };
    Floaty.prototype.renderFloatingStack = function () {
        var _a = this.props, item = _a.floatingItem, title = _a.floatingTitle;
        var _b = this.state, x = _b.x, y = _b.y;
        var scrollX = window.scrollX, scrollY = window.scrollY;
        return React.createElement(StackFloating_1.default, { title: title, item: item, x: x - scrollX, y: y - scrollY });
    };
    Floaty.prototype.resolveDropArea = function (position) {
        if (this.item) {
            return this.item.resolveDropArea(position);
        }
        else {
            var _a = this.props, dispatch_1 = _a.dispatch, id_1 = _a.id, floaty = _a.floaty;
            var box = DomUtil.elementOffset(this.container);
            return {
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
                resolved: true,
                execute: function (item, title) { return dispatch_1(actions_1.setLayout(id_1, { type: 'stack', items: [item], titles: [title] })); }
            };
        }
    };
    Floaty.prototype.renderDropArea = function () {
        var theme = this.props.theme;
        var showTargetIndicator = this.state.showTargetIndicator;
        if (showTargetIndicator) {
            var _a = this.state.targetIndicator, left = _a.left, top_2 = _a.top, width = _a.width, height = _a.height;
            var scrollX_1 = window.scrollX, scrollY_1 = window.scrollY;
            return React.createElement("div", { className: theme['floaty-target-indicator'], style: { top: top_2 - scrollY_1, left: left - scrollX_1, width: width, height: height } });
        }
    };
    Floaty.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, dispatch = _a.dispatch, id = _a.id, item = _a.item, refs = _a.refs, floaty = _a.floaty, theme = _a.theme, isFloating = _a.isFloating, floatingItem = _a.floatingItem, floatingTitle = _a.floatingTitle, onClose = _a.onClose, other = __rest(_a, ["children", "dispatch", "id", "item", "refs", "floaty", "theme", "isFloating", "floatingItem", "floatingTitle", "onClose"]);
        if (item !== undefined && item !== null) {
            return React.createElement("div", __assign({ ref: function (r) {
                    if (r !== null) {
                        _this.container = r;
                    }
                } }, other),
                React.createElement(Item_1.Item, { ref: function (r) {
                        if (r !== null) {
                            _this.item = r['wrappedInstance'];
                        }
                    }, id: item }),
                isFloating && this.renderFloatingStack(),
                isFloating && this.renderDropArea());
        }
        else {
            return null;
        }
    };
    Floaty.propTypes = {
        refs: React.PropTypes.object,
        floaty: React.PropTypes.object.isRequired,
        id: React.PropTypes.any.isRequired,
        item: React.PropTypes.any,
        theme: React.PropTypes.object.isRequired,
        isFloating: React.PropTypes.bool.isRequired,
        onClose: React.PropTypes.func
    };
    Floaty.defaultProps = {
        refs: {}
    };
    Floaty.childContextTypes = {
        floatyContext: Types_1.floatyContextType
    };
    return Floaty;
}(React.Component));
exports.default = react_redux_1.connect(selectors_1.floatySelector, undefined, undefined, { pure: false })(Floaty);
//# sourceMappingURL=Floaty.js.map
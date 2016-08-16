'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// const noop = () => undefined;
//
// export default class Stack extends React.Component {
//     static contextTypes = {
//         theme: React.PropTypes.object.isRequired
//     };
//
//     state = {
//         active: 0
//     };
//
//     draggables = [];
//
//     componentDidMount() {
//         this.makeDraggables();
//     }
//
//     componentDidUpdate() {
//         this.unmakeDraggables(this.makeDraggables.bind(this));
//     }
//
//     componentWillUnmount() {
//         this.unmakeDraggables();
//     }
//
//     handleTabClick(index) {
//         this.setState({active: index});
//     }
//
//     renderActiveChild() {
//         const {children} = this.props;
//         return React.Children.toArray(children)[this.state.active];
//     }
//
//     unmakeDraggables(callback = noop) {
//         if (this.draggables.length == 0) {
//             setImmediate(callback);
//         } else {
//             let destroyedCount = 0;
//             this.draggables.forEach(draggable => draggable.on('destroyed', () => {
//                 if (++destroyedCount == this.draggables.length) {
//                     this.draggables = [];
//                     setImmediate(callback);
//                 }
//             }));
//             this.draggables.forEach(draggable => draggable.emit('destroy'));
//         }
//     }
//
//     makeDraggables() {
//         for (let i = 0; i < React.Children.count(this.props.children); i++) {
//             const draggable = Draggable(ReactDOM.findDOMNode(this.refs['tab-' + i]));
//             draggable.on('dragstart', this.handleDragStart.bind(this, i));
//             draggable.on('drag', this.handleDrag.bind(this, i));
//             draggable.on('dragstop', this.handleDragStop.bind(this, i));
//             this.draggables.push(draggable);
//         }
//     }
//
//     handleDragStart(index) {
//         // todo: send stuff to event bus
//         // MAKE SURE STATE/PROPS DON'T CHANGE HERE, IT WILL REBUILD THE DRAGGABLES
//         // OR: KEEP DRAGGABLES ALIVE WHILE STATE/PROPS CHANGE
//     }
//
//     handleDrag(index, event) {
//         // todo: send stuff to event bus
//     }
//
//     handleDragStop(index, event) {
//         // todo: send stuff to event bus
//     }
//
//     getDropArea(mouseX, mouseY) {
//         let area = undefined;
//         const {x, y, width, height} = DomUtil.elementOffset(this.refs['header']);
//         if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height) {
//             area = {x, y, width, height};
//         }
//         return area;
//     }
//
//     render() {
//         const {theme} = this.context;
//         const {children, className, ...other} = this.props;
//
//         return <div className={classNames(theme['floaty-stack'], className)} {...other}>
//             <div ref="header" className={theme['floaty-stack-header']}>
//                 <ul className={theme['floaty-stack-header-tabs']}>
//                     {React.Children.map(this.props.children, (child, index) =>
//                         <li ref={'tab-' + index} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index == this.state.active})} onClick={this.handleTabClick.bind(this, index)}>
//                             {child.props.title}
//                         </li>
//                     )}
//                 </ul>
//             </div>
//             {this.renderActiveChild()}
//         </div>;
//     }
// };

var Stack = function (_React$Component) {
    _inherits(Stack, _React$Component);

    function Stack() {
        _classCallCheck(this, Stack);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Stack).apply(this, arguments));
    }

    _createClass(Stack, [{
        key: 'handleTabClick',
        value: function handleTabClick(index) {
            this.props.dispatcher((0, _actions.updateActiveTab)(index));
        }
    }, {
        key: 'renderActiveChild',
        value: function renderActiveChild() {
            var _props = this.props;
            var active = _props.active;
            var children = _props.children;

            return _react2.default.Children.toArray(children)[active];
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props;
            var active = _props2.active;
            var children = _props2.children;
            var className = _props2.className;
            var dispatcher = _props2.dispatcher;
            var names = _props2.names;

            var other = _objectWithoutProperties(_props2, ['active', 'children', 'className', 'dispatcher', 'names']);

            var theme = this.context.theme;


            return _react2.default.createElement(
                'div',
                _extends({ className: (0, _classnames2.default)(theme['floaty-stack'], className) }, other),
                _react2.default.createElement(
                    'div',
                    { ref: 'header', className: theme['floaty-stack-header'] },
                    _react2.default.createElement(
                        'ul',
                        { className: theme['floaty-stack-header-tabs'] },
                        _react2.default.Children.map(this.props.children, function (child, index) {
                            return _react2.default.createElement(
                                'li',
                                { ref: 'tab-' + index, className: (0, _classnames2.default)(theme['floaty-stack-header-tabs-item'], _defineProperty({}, theme['floaty-stack-header-tabs-item-active'], index == active)), onClick: _this2.handleTabClick.bind(_this2, index) },
                                names[index]
                            );
                        })
                    )
                ),
                this.renderActiveChild()
            );
        }
    }]);

    return Stack;
}(_react2.default.Component);

Stack.propTypes = {
    active: _react2.default.PropTypes.number.isRequired,
    dispatcher: _react2.default.PropTypes.func.isRequired,
    names: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string).isRequired
};
Stack.contextTypes = {
    theme: _react2.default.PropTypes.object.isRequired
};
exports.default = Stack;
;
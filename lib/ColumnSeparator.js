'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _shallowequal = require('shallowequal');

var _shallowequal2 = _interopRequireDefault(_shallowequal);

var _Draggable = require('./Draggable');

var _Draggable2 = _interopRequireDefault(_Draggable);

var _Types = require('./Types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnSeparator = function (_React$Component) {
    _inherits(ColumnSeparator, _React$Component);

    function ColumnSeparator() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, ColumnSeparator);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ColumnSeparator.__proto__ || Object.getPrototypeOf(ColumnSeparator)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            offset: 0
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(ColumnSeparator, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContent) {
            return !(0, _shallowequal2.default)(this.props, nextProps) || !(0, _shallowequal2.default)(this.state, nextState) || !(0, _shallowequal2.default)(this.context, nextContent);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.draggable = (0, _Draggable2.default)(_reactDom2.default.findDOMNode(this));
            this.draggable.on('dragstart', this.handleDragStart.bind(this));
            this.draggable.on('drag', this.handleDrag.bind(this));
            this.draggable.on('dragstop', this.handleDragStop.bind(this));
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.draggable.emit('destroy');
        }
    }, {
        key: 'clampOffset',
        value: function clampOffset(offset) {
            var _props$getBounds = this.props.getBounds();

            var min = _props$getBounds.min;
            var max = _props$getBounds.max;

            return Math.min(max, Math.max(min, offset));
        }
    }, {
        key: 'handleDragStart',
        value: function handleDragStart() {
            var theme = this.context.floatyContext.theme;

            document.body.classList.add(theme['floaty-unselectable']);
        }
    }, {
        key: 'handleDrag',
        value: function handleDrag(event) {
            event.originalEvent.stopPropagation();
            event.originalEvent.preventDefault();
            this.setState({ offset: this.clampOffset(event.dy) });
        }
    }, {
        key: 'handleDragStop',
        value: function handleDragStop() {
            var theme = this.context.floatyContext.theme;

            document.body.classList.remove(theme['floaty-unselectable']);
            this.props.onPositionChange(this.state.offset);
            this.setState({ offset: 0 });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var className = _props.className;
            var onPositionChange = _props.onPositionChange;
            var offset = this.state.offset;
            var theme = this.context.floatyContext.theme;


            return _react2.default.createElement('div', { className: (0, _classnames2.default)(theme['floaty-column-separator'], className), style: { top: offset } });
        }
    }]);

    return ColumnSeparator;
}(_react2.default.Component);

ColumnSeparator.propTypes = {
    getBounds: _react2.default.PropTypes.func.isRequired,
    onPositionChange: _react2.default.PropTypes.func.isRequired
};
ColumnSeparator.contextTypes = {
    floatyContext: _Types.floatyContextType
};
exports.default = ColumnSeparator;
;
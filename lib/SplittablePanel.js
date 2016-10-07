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

var _DomUtil = require('./DomUtil');

var _DomUtil2 = _interopRequireDefault(_DomUtil);

var _actions = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SplittablePanel = function (_React$Component) {
    _inherits(SplittablePanel, _React$Component);

    function SplittablePanel() {
        _classCallCheck(this, SplittablePanel);

        return _possibleConstructorReturn(this, (SplittablePanel.__proto__ || Object.getPrototypeOf(SplittablePanel)).apply(this, arguments));
    }

    _createClass(SplittablePanel, [{
        key: 'dispatch',
        value: function dispatch(action) {
            throw new Error('Abstract method');
        }
    }, {
        key: 'transformChildren',
        value: function transformChildren() {
            var children = this.props.children;

            if (_react2.default.Children.count(children) == 1) {
                var child = _react2.default.Children.toArray(children)[0];
                if (_react2.default.isValidElement(child)) {
                    return _react2.default.cloneElement(child, { ref: 'content' });
                } else {
                    return children;
                }
            } else {
                return children;
            }
        }
    }, {
        key: 'split',
        value: function split(position) {
            var _this2 = this;

            var element = _reactDom2.default.findDOMNode(this.refs['container']);
            var box = _DomUtil2.default.elementOffset(element);
            var leftBox = _extends({}, box, { width: 0.2 * box.width });
            var rightBox = _extends({}, box, { x: box.x + box.width * 0.8, width: 0.2 * box.width });
            var topBox = _extends({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5 });
            var bottomBox = _extends({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5 });
            if (_DomUtil2.default.isWithinBox(position, leftBox)) {
                // Make row here: floating content to the left, original content to the right
                return _extends({}, box, { width: box.width / 2, dispatch: function dispatch(item, title) {
                        return _this2.dispatch((0, _actions.transformIntoRow)([{ type: 'stack', titles: [title], items: [item] }], true));
                    }, resolved: true });
            }
            if (_DomUtil2.default.isWithinBox(position, rightBox)) {
                // Make row here: floating content to the right, original content to the left
                return _extends({}, box, { x: box.x + box.width / 2, width: box.width / 2, dispatch: function dispatch(item, title) {
                        return _this2.dispatch((0, _actions.transformIntoRow)([{ type: 'stack', titles: [title], items: [item] }], false));
                    }, resolved: true });
            }
            if (_DomUtil2.default.isWithinBox(position, topBox)) {
                return _extends({}, box, { height: box.height / 2, dispatch: function dispatch(item, title) {
                        return _this2.dispatch((0, _actions.transformIntoColumn)([{ type: 'stack', titles: [title], items: [item] }], true));
                    }, resolved: true });
            }
            if (_DomUtil2.default.isWithinBox(position, bottomBox)) {
                return _extends({}, box, { y: box.y + box.height / 2, height: box.height / 2, dispatch: function dispatch(item, title) {
                        return _this2.dispatch((0, _actions.transformIntoColumn)([{ type: 'stack', titles: [title], items: [item] }], false));
                    }, resolved: true });
            }
            return { x: 0, y: 0, width: 0, height: 0, dispatch: _actions.noOperation, resolved: false };
        }
    }, {
        key: 'resolveDropArea',
        value: function resolveDropArea(position) {
            var children = this.props.children;

            if (_react2.default.Children.count(children) == 1) {
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
    }]);

    return SplittablePanel;
}(_react2.default.Component);

exports.default = SplittablePanel;
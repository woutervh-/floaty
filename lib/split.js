'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = split;

var _actions = require('./actions');

var _DomUtil = require('./DomUtil');

var DomUtil = _interopRequireWildcard(_DomUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function split(element, position, id, dispatch) {
    var box = DomUtil.elementOffset(element);
    var leftBox = _extends({}, box, { width: 0.2 * box.width });
    var rightBox = _extends({}, box, { x: box.x + box.width * 0.8, width: 0.2 * box.width });
    var topBox = _extends({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, height: box.height * 0.5 });
    var bottomBox = _extends({}, box, { x: box.x + box.width * 0.2, width: box.width * 0.6, y: box.y + box.height * 0.5, height: box.height * 0.5 });
    if (DomUtil.isWithinBox(position, leftBox)) {
        // Make row here: floating content to the left, original content to the right
        return _extends({}, box, {
            width: box.width / 2,
            execute: function execute(item, title) {
                return dispatch((0, _actions.transformIntoRow)(id, { type: 'stack', items: [item], titles: [title] }, true));
            },
            resolved: true
        });
    }
    if (DomUtil.isWithinBox(position, rightBox)) {
        // Make row here: floating content to the right, original content to the left
        return _extends({}, box, {
            x: box.x + box.width / 2,
            width: box.width / 2,
            execute: function execute(item, title) {
                return dispatch((0, _actions.transformIntoRow)(id, { type: 'stack', items: [item], titles: [title] }, false));
            },
            resolved: true
        });
    }
    if (DomUtil.isWithinBox(position, topBox)) {
        return _extends({}, box, {
            height: box.height / 2,
            execute: function execute(item, title) {
                return dispatch((0, _actions.transformIntoColumn)(id, { type: 'stack', items: [item], titles: [title] }, true));
            },
            resolved: true
        });
    }
    if (DomUtil.isWithinBox(position, bottomBox)) {
        return _extends({}, box, {
            y: box.y + box.height / 2,
            height: box.height / 2,
            execute: function execute(item, title) {
                return dispatch((0, _actions.transformIntoColumn)(id, { type: 'stack', items: [item], titles: [title] }, false));
            },
            resolved: true
        });
    }
    return { x: 0, y: 0, width: 0, height: 0, resolved: false };
};
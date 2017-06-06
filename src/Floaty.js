import React from 'react';
import shallowEqual from 'shallowequal';
import connect from 'react-redux/lib/connect/connect';
import Item from './Item';
import {startFloating, stopFloating, setLayout} from './actions';
import {floatySelector} from './selectors';
import {floatyContextType} from './Types';
import getPosition from './getPosition';
import {isIdentifier} from './identifiers';
import StackFloating from './StackFloating';
import * as DomUtil from './DomUtil';
import navigator from './navigator';

class Floaty extends React.Component {
    static propTypes = {
        refs: React.PropTypes.object,
        floaty: React.PropTypes.object.isRequired,
        id: React.PropTypes.any.isRequired,
        item: React.PropTypes.any,
        theme: React.PropTypes.object.isRequired,
        stackControls: React.PropTypes.any,
        isFloating: React.PropTypes.bool.isRequired,
        onClose: React.PropTypes.func
    };

    static defaultProps = {
        refs: {}
    };

    static childContextTypes = {
        floatyContext: floatyContextType
    };

    state = {
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

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handleUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
    }

    getChildContext() {
        return {
            floatyContext: {
                float: this.dragStart,
                refs: this.props.refs,
                theme: this.props.theme
            }
        };
    }

    handleMove = event => {
        const {isFloating} = this.props;
        if (isFloating) {
            const {x, y} = getPosition(event);
            const {x: left, y: top, width, height, resolved} = this.resolveDropArea({x, y});
            if (resolved) {
                this.setState({x, y, showTargetIndicator: true, targetIndicator: {top, left, width, height}});
            } else {
                this.setState({x, y, showTargetIndicator: false});
            }
        }
    };

    handleUp = () => {
        const {isFloating} = this.props;
        if (isFloating) {
            const {dispatch, id, theme} = this.props;
            const {x, y} = this.state;

            document.body.classList.remove(theme['floaty-unselectable']);
            const resolution = this.resolveDropArea({x, y});
            const {floatingItem, floatingTitle, floaty, onClose} = this.props;
            if (resolution.resolved) {
                resolution.execute(floatingItem, floatingTitle);
                dispatch(stopFloating(id));
            } else {
                dispatch(stopFloating(id));
                if (onClose) {
                    onClose(floaty.items[floatingItem] || floatingItem, floaty.items[floatingTitle] || floatingTitle);
                }
            }
        }
    };

    dragStart = (item, title) => {
        const {dispatch, id, theme} = this.props;
        dispatch(startFloating(id, item, title));
        document.body.classList.add(theme['floaty-unselectable']);
    };

    navigator() {
        const {floaty, id} = this.props;
        return navigator(floaty, id);
    }

    renderFloatingStack() {
        const {floatingItem: item, floatingTitle: title} = this.props;
        const {x, y} = this.state;
        const {scrollX, scrollY} = window;
        return <StackFloating title={title} item={item} x={x - scrollX} y={y - scrollY}/>;
    }

    resolveDropArea(position) {
        if (this.item) {
            return this.item.getWrappedInstance().resolveDropArea(position);
        } else {
            const {dispatch, id} = this.props;
            const box = DomUtil.elementOffset(this.container);
            return {
                ...box,
                resolved: true,
                execute: (item, title) => dispatch(setLayout(id, {type: 'stack', items: [item], titles: [title]}))
            };
        }
    }

    renderDropArea() {
        const {theme} = this.props;
        const {showTargetIndicator} = this.state;
        if (showTargetIndicator) {
            const {targetIndicator: {left, top, width, height}} = this.state;
            const {scrollX, scrollY} = window;
            return <div className={theme['floaty-target-indicator']} style={{top: top - scrollY, left: left - scrollX, width, height}}/>;
        }
    }

    render() {
        const {children, layout, dispatch, id, item, refs, floaty, stackControls, theme, isFloating, floatingItem, floatingTitle, onClose, ...other} = this.props;

        return <div ref={r => this.container = r} {...other}>
            {isIdentifier(item) ? <Item ref={r => this.item = r} id={item}/> : item}
            {isFloating && this.renderFloatingStack()}
            {isFloating && this.renderDropArea()}
        </div>;
    }
}

export default connect(floatySelector, undefined, undefined, {pure: false})(Floaty);

import React from 'react';
import shallowEqual from 'shallowequal';
import connect from 'react-redux/lib/components/connect';
import Item from './Item';
import {startFloating, stopFloating} from './actions';
import {floatySelector} from './selectors';
import SplittablePanel from './SplittablePanel';
import {floatyContextType} from './Types';
import getPosition from './getPosition';
import {isReference} from './references';
import StackFloating from './StackFloating';

class Floaty extends SplittablePanel {
    static propTypes = {
        refs: React.PropTypes.object,
        id: React.PropTypes.any.isRequired,
        item: React.PropTypes.any.isRequired,
        theme: React.PropTypes.object.isRequired,
        stackControls: React.PropTypes.any,
        isFloating: React.PropTypes.bool.isRequired
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
            const {x, y} = getPosition(event);

            document.body.classList.remove(theme['floaty-unselectable']);
            const resolution = this.resolveDropArea({x, y});
            if (resolution.resolved) {
                const {floatingItem, floatingTitle} = this.props;
                resolution.execute(floatingItem, floatingTitle);
            }
            dispatch(stopFloating(id));
        }
    };

    dragStart = (item, title) => {
        const {dispatch, id, theme} = this.props;
        dispatch(startFloating(id, item, title));
        document.body.classList.add(theme['floaty-unselectable']);
    };

    renderFloatingStack() {
        const {floatingItem: item, floatingTitle: title} = this.props;
        const {x, y} = this.state;
        const {scrollX, scrollY} = window;
        return <StackFloating title={title} item={item} x={x - scrollX} y={y - scrollY}/>;
    }

    resolveDropArea(position) {
        return this.item.getWrappedInstance().resolveDropArea(position);
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
        const {children, layout, dispatch, id, item, refs, stackControls, theme, isFloating, floatingItem, floatingTitle, ...other} = this.props;

        return <div ref={'container'} {...other}>
            {isReference(item) ? <Item ref={r => this.item = r} id={item}/> : item}
            {isFloating && this.renderFloatingStack()}
            {isFloating && this.renderDropArea()}
        </div>;
    }
}

export default connect(floatySelector)(Floaty);

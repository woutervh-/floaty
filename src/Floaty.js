import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'shallowequal';
import connect from 'react-redux/lib/components/connect';
import * as DomUtil from './DomUtil';
import Item from './Item';
import {removeTab, setLayout, startFloating, stopFloating} from './actions';
import {floatySelector} from './selectors';
import SplittablePanel from './SplittablePanel';
import {floatyContextType} from './Types';
import getPosition from './getPosition';

const noOp = () => undefined;
const identity = x => x;

class Floaty extends SplittablePanel {
    static propTypes = {
        refs: React.PropTypes.object,
        id: React.PropTypes.number.isRequired,
        item: React.PropTypes.number.isRequired,
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

    // resolveDropArea(position) {
    //     if ('root' in this.refs) {
    //         return this.refs['root'].resolveDropArea(position);
    //     } else {
    //         const {dispatch} = this.props;
    //         const element = ReactDOM.findDOMNode(this.refs['container']);
    //         const box = DomUtil.elementOffset(element);
    //         return {...box, dispatch: (item, title) => dispatch(setLayout({type: 'stack', titles: [title], items: [item]})), resolved: true};
    //     }
    // }

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

    // renderRow(id) {
    // TODO: stick growValues in a selector
    // return <Row growValues={rowObject.growValues || new Array(rowObject.items.length).fill(1)}>}
    //     {rowObject.items.map((id, index) =>
    //         <RowItem key={index}>
    //             {this.renderItem(id)}
    //         </RowItem>
    //     )}
    // </Row>;
    // }

    // renderStack(stackObject) {
    //     const props = {
    //         dispatch,
    //         controls: this.props.stackControls,
    //         active: stackObject.active || 0,
    //         titles: stackObject.titles.map(tabTitle => this.renderLeafComponent(tabTitle)) || [],
    //         float: this.dragStart.bind(this, stackObject),
    //         ...stackObject.props
    //     };
    //     return <Stack ref={refAccumulator.join('-')} {...props}>
    //         {stackObject.items.map((stackItemObject, index) => this.renderStackItem(update => dispatch(updateStackItem(index, update)), [...refAccumulator, 'stack-item-' + index], stackItemObject, index))}
    //     </Stack>;
    // }

    // renderFloatingStack() {
    //     const {floating: stackItemObject, floatingTitle: title, x, y} = this.state;
    //     const {scrollX, scrollY} = window;
    //     return <StackFloating title={this.renderLeafComponent(title)} x={x - scrollX} y={y - scrollY}>
    //         <StackItem dispatch={noOp}>
    //             {this.renderGeneric(noOp, ['floating'], stackItemObject)}
    //         </StackItem>
    //     </StackFloating>;
    // }

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
            {typeof item === 'number' ? <Item ref={r => this.item = r} id={item}/> : item}
            {/*{isFloating && this.renderFloatingStack()}*/}
            {isFloating && this.renderDropArea()}
        </div>;
    }
}

export default connect(floatySelector)(Floaty);

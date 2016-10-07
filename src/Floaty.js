import React from 'react';
import ReactDOM from 'react-dom';
import shallowEqual from 'shallowequal';
import connect from 'react-redux/lib/components/connect';
import DomUtil from './DomUtil';
import Column from './Column';
import ColumnItem from './ColumnItem';
import Row from './Row';
import Item from './Item';
import RowItem from './RowItem';
import Stack from './Stack';
import StackFloating from './StackFloating';
import StackItem from './StackItem';
import {removeTab, updateGeneric, updateRow, updateRowItem, updateColumn, updateColumnItem, updateStack, updateStackItem, setLayout, setStateFromReducer} from './actions';
import SplittablePanel from './SplittablePanel';

const noOp = () => undefined;
const identity = x => x;

export default class Floaty extends SplittablePanel {
    static propTypes = {
        refs: React.PropTypes.object,
        id: React.PropTypes.number.isRequired,
        theme: React.PropTypes.object.isRequired,
        stackControls: React.PropTypes.any
    };

    static defaultProps = {
        refs: {}
    };

    static childContextTypes = {
        floatyContext: React.PropTypes.shape({
            theme: React.PropTypes.object.isRequired,
            refs: React.PropTypes.object.isRequired
        }).isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    state = {
        floating: null,
        floatingTitle: '',
        x: 0,
        y: 0,
        targetIndicator: {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        },
        showTargetIndicator: false
    };

    getChildContext() {
        return {
            floatyContext: {
                refs: this.props.refs,
                theme: this.props.theme
            }
        };
    }

    resolveDropArea(position) {
        if ('root' in this.refs) {
            return this.refs['root'].resolveDropArea(position);
        } else {
            const {dispatch} = this.props;
            const element = ReactDOM.findDOMNode(this.refs['container']);
            const box = DomUtil.elementOffset(element);
            return {...box, dispatch: (item, title) => dispatch(setLayout({type: 'stack', titles: [title], items: [item]})), resolved: true};
        }
    }

    dragStart(stackObject, index, event, dispatch, draggable) {
        // This will take control of a draggable
        const {theme} = this.props;
        document.body.classList.add(theme['floaty-unselectable']);

        // Start floating the item
        this.setState({floating: stackObject.items[index], floatingTitle: stackObject.titles[index], x: event.position.x, y: event.position.y});
        // Remove item from the stack
        dispatch(removeTab(index));

        draggable.on('drag', event => {
            const resolution = this.resolveDropArea({x: event.position.x, y: event.position.y});
            const {x, y, width, height, resolved} = resolution;
            if (resolved) {
                this.setState({x: event.position.x, y: event.position.y, targetIndicator: {x, y, width, height}, showTargetIndicator: true});
            } else {
                this.setState({x: event.position.x, y: event.position.y, showTargetIndicator: false});
            }
        });
        draggable.on('dragstop', event => {
            document.body.classList.remove(theme['floaty-unselectable']);
            const resolution = this.resolveDropArea({x: event.position.x, y: event.position.y});
            if (resolution.resolved) {
                resolution.dispatch(this.state.floating, this.state.floatingTitle);
            }
            this.setState({floating: null, floatingTitle: ''});
            draggable.emit('destroy');
        });
    }

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

    renderDropArea() {
        const {theme} = this.props;
        const {showTargetIndicator} = this.state;
        if (showTargetIndicator) {
            const {x, y, width, height} = this.state.targetIndicator;
            const {scrollX, scrollY} = window;
            return <div className={theme['floaty-target-indicator']} style={{top: y - scrollY, left: x - scrollX, width, height}}/>;
        }
    }

    render() {
        const {children, layout, id, refs, stackControls, theme, ...other} = this.props;
        return <div ref={'container'} {...other}>
            <Item id={id}/>
            {/*{this.state.floating && this.renderFloatingStack()}*/}
            {this.state.floating && this.renderDropArea()}
        </div>;
    }
}

import React from 'react';
import Column from './Column';
import ColumnItem from './ColumnItem';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackFloating from './StackFloating';
import StackItem from './StackItem';
import {removeTab, updateGeneric, updateRow, updateRowItem, updateColumn, updateColumnItem, updateStack, updateStackItem} from './actions';
import SplittablePanel from './SplittablePanel';
import shallowEqual from 'shallowequal';

const noOp = () => undefined;

export default class FloatyLayout extends SplittablePanel {
    static propTypes = {
        refs: React.PropTypes.object,
        store: React.PropTypes.any.isRequired,
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    state = {
        floating: null,
        floatingName: '',
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

    componentWillMount() {
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getChildContext() {
        return {theme: this.props.theme};
    }

    // todo: implement dispatch() from SplittablePanel

    resolveDropArea(position) {
        if ('root' in this.refs) {
            return this.refs['root'].resolveDropArea(position);
        } else {
            return this.split(position);
        }
    }

    dragStart(stackObject, index, event, dispatch, draggable) {
        // This will take control of a draggable
        const {theme} = this.props;
        document.body.classList.add(theme['floaty-unselectable']);

        // Start floating the item
        this.setState({floating: stackObject.items[index], floatingName: stackObject.names[index], x: event.originalEvent.pageX, y: event.originalEvent.pageY});
        // Remove item from the stack
        dispatch(removeTab(index));

        draggable.on('drag', event => {
            const resolution = this.resolveDropArea({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
            const {x, y, width, height, resolved} = resolution;
            if (resolved) {
                this.setState({x: event.originalEvent.pageX, y: event.originalEvent.pageY, targetIndicator: {x, y, width, height}, showTargetIndicator: true});
            } else {
                this.setState({x: event.originalEvent.pageX, y: event.originalEvent.pageY, showTargetIndicator: false});
            }
        });
        draggable.on('dragstop', event => {
            document.body.classList.remove(theme['floaty-unselectable']);
            const resolution = this.resolveDropArea({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
            if (resolution.resolved) {
                const {store} = this.props;
                resolution.dispatch(this.state.floating, this.state.floatingName);
            }
            this.setState({floating: null, floatingName: ''});
            draggable.emit('destroy');
        });
    }

    renderGeneric(dispatch, refAccumulator, genericObject) {
        switch (genericObject.type) {
            case 'column':
                return this.renderColumn(update => dispatch(updateColumn(update)), refAccumulator, genericObject);
            case 'row':
                return this.renderRow(update => dispatch(updateRow(update)), refAccumulator, genericObject);
            case 'stack':
                return this.renderStack(update => dispatch(updateStack(update)), refAccumulator, genericObject);
            case 'prop-ref':
                return this.props.refs[genericObject.name];
            case 'child-ref':
                return this.props.children[genericObject.index];
            case 'component':
            default:
                return genericObject.content;
        }
    }

    renderColumn(dispatch, refAccumulator, columnObject) {
        const props = {
            dispatch,
            growValues: columnObject.growValues || Array(columnObject.items.length).fill(1),
            ...columnObject.props
        };
        return <Column ref={refAccumulator.join('-')} {...props}>
            {columnObject.items.map((columnItemObject, index) => this.renderColumnItem(update => dispatch(updateColumnItem(index, update)), [...refAccumulator, 'column-item-' + index], columnItemObject, index))}
        </Column>;
    }

    renderColumnItem(dispatch, refAccumulator, columnItemObject, index) {
        return <ColumnItem dispatch={dispatch} key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), refAccumulator, columnItemObject)}
        </ColumnItem>;
    }

    renderRow(dispatch, refAccumulator, rowObject) {
        const props = {
            dispatch,
            growValues: rowObject.growValues || Array(rowObject.items.length).fill(1),
            ...rowObject.props
        };
        return <Row ref={refAccumulator.join('-')} {...props}>
            {rowObject.items.map((rowItemObject, index) => this.renderRowItem(update => dispatch(updateRowItem(index, update)), [...refAccumulator, 'row-item-' + index], rowItemObject, index))}
        </Row>;
    }

    renderRowItem(dispatch, refAccumulator, rowItemObject, index) {
        return <RowItem dispatch={dispatch} key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), refAccumulator, rowItemObject)}
        </RowItem>;
    }

    renderStack(dispatch, refAccumulator, stackObject) {
        const props = {
            dispatch,
            active: stackObject.active || 0,
            names: stackObject.names || [],
            float: this.dragStart.bind(this, stackObject),
            ...stackObject.props
        };
        return <Stack ref={refAccumulator.join('-')} {...props}>
            {stackObject.items.map((stackItemObject, index) => this.renderStackItem(update => dispatch(updateStackItem(index, update)), [...refAccumulator, 'stack-item-' + index], stackItemObject, index))}
        </Stack>;
    }

    renderStackItem(dispatch, refAccumulator, stackItemObject, index) {
        return <StackItem dispatch={dispatch} key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), refAccumulator, stackItemObject)}
        </StackItem>;
    }

    renderFloatingStack() {
        const {floating: stackItemObject, floatingName: name} = this.state;
        return <StackFloating name={name} x={this.state.x} y={this.state.y}>
            <StackItem dispatch={noOp}>
                {this.renderGeneric(noOp, ['floating'], stackItemObject)}
            </StackItem>
        </StackFloating>;
    }

    renderDropArea() {
        const {theme} = this.props;
        const {showTargetIndicator} = this.state;
        if (showTargetIndicator) {
            const {x, y, width, height} = this.state.targetIndicator;
            return <div className={theme['floaty-target-indicator']} style={{top: y, left: x, width, height}}/>;
        }
    }

    render() {
        const {refs, store, theme, ...other} = this.props;
        return <div ref={'container'} {...other}>
            {this.renderGeneric(store.dispatch, ['root'], store.getState())}
            {this.state.floating && this.renderFloatingStack()}
            {this.state.floating && this.renderDropArea()}
        </div>;
    }
};

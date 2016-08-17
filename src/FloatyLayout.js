import React from 'react';
import ReactDOM from 'react-dom';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackFloating from './StackFloating';
import StackItem from './StackItem';
import {setLayout, insertTab, removeTab, updateActiveTab, updateGeneric, updateRow, updateRowItem, updateStack, updateStackItem} from './actions';
import DomUtil from './DomUtil';
import * as LayoutUtil from './LayoutUtil';

const noOp = () => undefined;

export default class FloatyLayout extends React.Component {
    static propTypes = {
        refs: React.PropTypes.object,
        store: React.PropTypes.any.isRequired,
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired
    };

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
        }
    };

    componentWillMount() {
        const {store} = this.props;
        this.unsubscribe = store.subscribe(() => {
            const layout = store.getState();
            if (LayoutUtil.isLayoutMinimal(layout)) {
                this.forceUpdate();
            } else {
                const minimalLayout = LayoutUtil.minimizeLayout(layout);
                store.dispatch(setLayout(minimalLayout));
            }
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getChildContext() {
        return {theme: this.props.theme};
    }

    dragStart(stackObject, index, event, dispatch, draggable) {
        // This will take control of a draggable

        document.body.classList.add(this.props.theme['floaty-unselectable']);

        // Start floating the item
        this.setState({floating: stackObject.items[index], floatingName: stackObject.names[index], x: event.originalEvent.pageX, y: event.originalEvent.pageY});
        // Remove item from the stack
        dispatch(removeTab(index));

        draggable.on('drag', event => {
            const resolution = this.refs['root'].resolveDropArea({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
            const {x, y, width, height} = resolution;
            this.setState({x: event.originalEvent.pageX, y: event.originalEvent.pageY, targetIndicator: {x, y, width, height}});
        });
        draggable.on('dragstop', event => {
            document.body.classList.remove(this.props.theme['floaty-unselectable']);
            // todo: invoke action is resolution was successful
            // const drop = this.resolveDrop({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
            const resolution = this.refs['root'].resolveDropArea({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
            const drop = false;
            console.log(resolution);
            if (!drop) {
                // If drop couldn't be resolved => undo delete (add stack item back to stack)
                // dispatch(insertTab(index, this.state.floating, this.state.floatingName));
                // dispatch(updateActiveTab(index));
            } else {
                // If drop was resolved => this.store.dispatch();
            }
            this.setState({floating: null, floatingName: ''});
            draggable.emit('destroy');
        });
    }

    renderGeneric(dispatch, refAccumulator, genericObject) {
        switch (genericObject.type) {
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

    renderRow(dispatch, refAccumulator, rowObject) {
        const props = {
            dispatch,
            growValues: rowObject.growValues || [],
            ...rowObject.props
        };
        return <Row ref={refAccumulator.join('-')} {...props}>
            {rowObject.items.map((rowItemObject, index) => this.renderRowItem(update => dispatch(updateRowItem(index, update)), [...refAccumulator, 'row-item-' + index], rowItemObject, index))}
        </Row>;
    }

    renderRowItem(dispatch, refAccumulator, rowItemObject, index) {
        return <RowItem key={index}>
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
        return <StackItem key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), refAccumulator, stackItemObject)}
        </StackItem>;
    }

    renderFloatingStack() {
        const {floating: stackItemObject, floatingName: name} = this.state;
        return <StackFloating name={name} style={{position: 'fixed', top: this.state.y, left: this.state.x, width: '20vw', height: '20vw'}}>
            <StackItem>
                {this.renderGeneric(noOp, ['floating'], stackItemObject)}
            </StackItem>
        </StackFloating>;
    }

    renderDropArea() {
        // requires sub-component to be something like:
        // getDropArea(x, y) => (x, y, width, height, dispatch, resolved)

        // const {x, y, width, height} = DomUtil.elementOffset(this.getRef('container'));
        const {x, y, width, height} = this.state.targetIndicator;
        return <div style={{position: 'fixed', top: y, left: x, width, height, backgroundColor: 'rgba(0, 0, 0, 0.25)'}}/>;
    }

    resolveGeneric(position, refAccumulator, genericObject) {
        switch (genericObject.type) {
            case 'row':
                return this.resolveRow(position, refAccumulator, genericObject);
            case 'stack':
                return this.resolveStack(position, refAccumulator, genericObject);
            case 'prop-ref':
            case 'child-ref':
            case 'component':
            default:
                const element = ReactDOM.findDOMNode(this.getRef(refAccumulator.join('-')));
                const {x, y, width, height} = DomUtil.elementOffset(element);
                if (x <= position.x && position.x <= x + width && y <= position.y && position.y <= y + height) {
                    return refAccumulator;
                }
        }
    }

    resolveRow(position, refAccumulator, rowObject) {
        return rowObject.items.map((rowItemObject, index) => this.resolveGeneric(position, [...refAccumulator, 'rowItem' + index], rowItemObject)).find(Boolean);
    }

    resolveStack(position, refAccumulator, stackObject) {
        return stackObject.items.map((stackItemObject, index) => this.resolveGeneric(position, [...refAccumulator, 'stackItem' + index, stackItemObject])).find(Boolean);
    }

    resolveDrop(position) {
        return this.resolveGeneric(position, ['root'], this.props.store.getState());
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

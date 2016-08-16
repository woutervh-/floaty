import React from 'react';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackFloating from './StackFloating';
import StackItem from './StackItem';
import {updateGeneric, updateRow, updateRowItem, updateStack, updateStackItem} from './actions';

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
        y: 0
    };

    componentWillMount() {
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getChildContext() {
        return {theme: this.props.theme};
    }

    dragStart(stackObject, index, event, draggable) {
        // This will take control of a draggable
        // Stack item will be removed from stack by stack itself

        document.body.classList.add(this.props.theme['floaty-unselectable']);
        this.setState({floating: stackObject.items[index], floatingName: stackObject.names[index], x: event.originalEvent.pageX, y: event.originalEvent.pageY});
        // TODO: assimilate useless components
        draggable.on('drag', event => {
            this.setState({x: event.originalEvent.pageX, y: event.originalEvent.pageY});
        });
        draggable.on('dragstop', () => {
            document.body.classList.remove(this.props.theme['floaty-unselectable']);
            // this.resolveDrop();
            // if drop couldn't be resolved => undo delete (add stack item back to stack)
            // if drop was resolved => this.store.dispatch();
            // TODO: assimilate useless components
            this.setState({floating: null, floatingName: ''});
            draggable.emit('destroy');
        });
    }

    renderGeneric(dispatch, genericObject) {
        switch (genericObject.type) {
            case 'row':
                return this.renderRow(update => dispatch(updateRow(update)), genericObject);
            case 'stack':
                return this.renderStack(update => dispatch(updateStack(update)), genericObject);
            case 'prop-ref':
                return this.props.refs[genericObject.name];
            case 'child-ref':
                return this.props.children[genericObject.index];
            case 'component':
            default:
                return genericObject.content;
        }
    }

    renderRow(dispatch, rowObject) {
        const props = {
            dispatch,
            growValues: rowObject.growValues || [],
            ...rowObject.props
        };
        return <Row {...props}>
            {rowObject.items.map((rowItemObject, index) => this.renderRowItem(update => dispatch(updateRowItem(index, update)), rowItemObject, index))}
        </Row>;
    }

    renderRowItem(dispatch, rowItemObject, index) {
        return <RowItem key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), rowItemObject)}
        </RowItem>;
    }

    renderStack(dispatch, stackObject) {
        const props = {
            dispatch,
            active: stackObject.active || 0,
            names: stackObject.names || [],
            float: this.dragStart.bind(this, stackObject),
            ...stackObject.props
        };
        return <Stack {...props}>
            {stackObject.items.map((stackItemObject, index) => this.renderStackItem(update => dispatch(updateStackItem(index, update)), stackItemObject, index))}
        </Stack>;
    }

    renderStackItem(dispatch, stackItemObject, index) {
        return <StackItem key={index}>
            {this.renderGeneric(update => dispatch(updateGeneric(update)), stackItemObject)}
        </StackItem>;
    }

    renderFloatingStack() {
        const {floating: stackItemObject, floatingName: name} = this.state;
        return <StackFloating name={name} style={{position: 'fixed', top: this.state.y, left: this.state.x, width: '20vw', height: '20vw'}}>
            <StackItem>
                {this.renderGeneric(noOp, stackItemObject)}
            </StackItem>
        </StackFloating>;
    }

    renderDropArea() {
        // requires sub-component to be something like:
        // getDropArea(x, y) => (x, y, width, height, action)
    }

    render() {
        const {refs, store, theme, ...other} = this.props;
        return <div {...other}>
            {this.renderGeneric(store.dispatch, store.getState())}
            {this.state.floating && this.renderFloatingStack()}
            {this.state.floating && this.renderDropArea()}
        </div>;
    }
};

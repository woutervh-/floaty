import React from 'react';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackItem from './StackItem';
import {updateGeneric, updateRow, updateRowItem, updateStack, updateStackItem} from './actions';

export default class FloatyComponent extends React.Component {
    static propTypes = {
        store: React.PropTypes.any.isRequired,
        theme: React.PropTypes.object.isRequired
    };

    static childContextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    shouldComponentUpdate() {
        // TODO: better implementation/get rid of this.forceUpdate in componentWillMount
        return false;
    }

    componentWillMount() {
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    getChildContext() {
        return {theme: this.props.theme};
    }

    renderGeneric(dispatcher, genericObject) {
        switch (genericObject.type) {
            case 'row':
                return this.renderRow(update => dispatcher(updateRow(update)), genericObject);
            case 'stack':
                return this.renderStack(update => dispatcher(updateStack(update)), genericObject);
            case 'prop-ref':
                return this.props[genericObject.name];
            case 'child-ref':
                return this.props.children[genericObject.index];
            case 'component':
            default:
                return genericObject.content;
        }
    }

    renderRow(dispatcher, rowObject) {
        const props = {
            dispatcher,
            growValues: rowObject.growValues || [],
            ...rowObject.props
        };
        return <Row {...props}>
            {rowObject.items.map((rowItemObject, index) => this.renderRowItem(update => dispatcher(updateRowItem(index, update)), rowItemObject, index))}
        </Row>;
    }

    renderRowItem(dispatcher, rowItemObject, index) {
        return <RowItem key={index} {...rowItemObject.props}>
            {this.renderGeneric(update => dispatcher(updateGeneric(update)), rowItemObject)}
        </RowItem>;
    }

    renderStack(dispatcher, stackObject) {
        const props = {
            dispatcher,
            active: stackObject.active || 0,
            names: stackObject.names || [],
            ...stackObject.props
        };
        return <Stack {...props}>
            {stackObject.items.map((stackItemObject, index) => this.renderStackItem(update => dispatcher(updateStackItem(index, update)), stackItemObject, index))}
        </Stack>;
    }

    renderStackItem(dispatcher, stackItemObject, index) {
        return <StackItem key={index} {...stackItemObject.props}>
            {this.renderGeneric(update => dispatcher(updateGeneric(update)), stackItemObject)}
        </StackItem>;
    }

    render() {
        const {store} = this.props;
        return this.renderGeneric(store.dispatch, store.getState());
    }
};

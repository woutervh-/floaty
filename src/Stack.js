import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Draggable from './Draggable';
import * as DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {insertTab, removeTab, setActiveTab} from './actions';
import StackItem from './StackItem';
import {floatyContextType} from './Types';
import split from './split';
import {isIdentifier}  from './identifiers';
import Item from './Item';

export default class Stack extends React.Component {
    static propTypes = {
        active: React.PropTypes.number,
        titles: React.PropTypes.array.isRequired,
        items: React.PropTypes.array.isRequired
    };

    static defaultProps = {
        active: 0
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    unmakeDraggablesTimeout = null;

    draggables = [];

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    componentDidMount() {
        this.makeDraggables();
    }

    componentWillUpdate() {
        this.unmakeDraggables();
    }

    componentDidUpdate() {
        this.unmakeDraggables(::this.makeDraggables);
    }

    componentWillUnmount() {
        this.unmakeDraggables();
    }

    makeDraggables() {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const draggable = Draggable(ReactDOM.findDOMNode(this['tab-' + i]), 5);
            draggable.on('dragstart', () => this.handleDragStart(i));
            this.draggables.push(draggable);
        }
    }

    unmakeDraggables(callback = () => undefined) {
        if (this.unmakeDraggablesTimeout) {
            window.clearTimeout(this.unmakeDraggablesTimeout);
        }

        if (this.draggables.length === 0) {
            this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
        } else {
            let destroyedCount = 0;
            this.draggables.forEach(draggable => draggable.on('destroyed', () => {
                if (++destroyedCount == this.draggables.length) {
                    this.draggables = [];
                    this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
                }
            }));
            this.draggables.forEach(draggable => draggable.emit('destroy'));
        }
    }

    handleDragStart(index) {
        const {id, dispatch, items, titles} = this.props;
        const {floatyContext: {float}} = this.context;
        this.draggables.splice(index, 1)[0].emit('destroy');
        dispatch(removeTab(id, index));
        float(items[index], titles[index]);
    }

    handleTabClick(index) {
        const {id, dispatch} = this.props;
        dispatch(setActiveTab(id, index));
    }

    resolveDropArea(position) {
        const headerElement = ReactDOM.findDOMNode(this.header);
        const headerBox = DomUtil.elementOffset(headerElement);
        if (DomUtil.isWithinBox(position, headerBox)) {
            const {dispatch, id, items} = this.props;
            for (let i = 0; i < items.length; i++) {
                const tabElement = ReactDOM.findDOMNode(this['tab-' + i]);
                const tabBox = DomUtil.elementOffset(tabElement);
                if (DomUtil.isWithinBox(position, tabBox)) {
                    return {...tabBox, execute: (item, title) => dispatch(insertTab(id, i, item, title)), resolved: true};
                }
            }
            return {...headerBox, execute: (item, title) => dispatch(insertTab(id, items.length, item, title)), resolved: true};
        } else {
            const containerElement = ReactDOM.findDOMNode(this.container);
            const containerBox = DomUtil.elementOffset(containerElement);
            if (DomUtil.isWithinBox(position, containerBox)) {
                const {dispatch, id} = this.props;
                return split(containerElement, position, id, dispatch);
            } else {
                return {x: 0, y: 0, width: 0, height: 0, resolved: false};
            }
        }
    }

    renderTabs() {
        const {active, children, titles, items} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <ul className={theme['floaty-stack-header-tabs']}>
            {[...new Array(items.length).keys()].map(index =>
                <li key={index} ref={r => this['tab-' + index] = r} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index === active})} onClick={() => this.handleTabClick(index)}>
                    {isIdentifier(titles[index]) ? <Item id={titles[index]}/> : titles[index]}
                </li>
            )}
        </ul>;
    }

    renderControls() {
        const {controls, dispatch} = this.props;
        const {floatyContext: {theme}} = this.context;

        if (controls) {
            return <ul className={theme['floaty-stack-header-controls']}>
                {controls.map((control, index)=>
                    <li key={index} className={theme['floaty-stack-header-controls-item']}>
                        {control(dispatch)}
                    </li>
                )}
            </ul>;
        }
    }

    renderHeader() {
        const {floatyContext: {theme}} = this.context;

        return <div ref={r => this.header = r} className={theme['floaty-stack-header']}>
            {this.renderTabs()}
            {/*{this.renderControls()}*/}
        </div>;
    }

    render() {
        const {active, items, className, controls, dispatch, float, titles, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div ref={r => this.container = r} className={classNames(theme['floaty-stack'], className)} {...other}>
            {this.renderHeader()}
            {0 <= active && active < items.length && <StackItem value={items[active]}/>}
        </div>;
    }
};

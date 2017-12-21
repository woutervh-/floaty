import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as classNames from 'classnames';
import Draggable from './Draggable';
import * as DomUtil from './DomUtil';
import shallowEqual = require('shallowequal');
import {insertTab, removeTab, setActiveTab} from './actions';
import StackItem from './StackItem';
import {floatyContextType, IFloatyContext} from './Types';
import split from './split';
import {Item} from './Item';
import {EventEmitter} from 'eventemitter3';
import {IDropAreaResolution} from './DropAreaTypes';
import {IFloatyState} from './reducers/index';

export interface StackProps extends React.AllHTMLAttributes<HTMLDivElement> {
    id: string;
    active: number;
    titles: Array<any>;
    items: Array<string>;
    dispatch: Redux.Dispatch<IFloatyState>;
}

export default class Stack extends React.Component<StackProps, never> {
    static defaultProps = {
        active: 0
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    tabs: {[key: string]: HTMLLIElement} = {};

    header: HTMLDivElement;

    container: HTMLDivElement;

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    unmakeDraggablesTimeout: number | null = null;

    draggables: Array<EventEmitter> = [];

    componentDidMount() {
        this.makeDraggables();
    }

    componentWillUpdate() {
        this.unmakeDraggables();
    }

    componentDidUpdate() {
        this.unmakeDraggables(() => this.makeDraggables());
    }

    componentWillUnmount() {
        this.unmakeDraggables();
    }

    makeDraggables() {
        const {items} = this.props;
        for (let i = 0; i < items.length; i++) {
            const draggable = Draggable(this.tabs['tab-' + i], 5);
            draggable.on('dragstart', () => this.handleDragStart(i));
            this.draggables.push(draggable);
        }
    }

    unmakeDraggables(callback: () => void = () => undefined) {
        const unmakeDraggablesTimeout = this.unmakeDraggablesTimeout;
        if (unmakeDraggablesTimeout !== null) {
            window.clearTimeout(unmakeDraggablesTimeout);
        }

        if (this.draggables.length === 0) {
            this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
        } else {
            let destroyedCount = 0;
            this.draggables.forEach(draggable => draggable.on('destroyed', () => {
                if (++destroyedCount == this.draggables.length) {
                    this.draggables = [];
                    this.tabs = {};
                    this.unmakeDraggablesTimeout = window.setTimeout(callback, 0);
                }
            }));
            this.draggables.forEach(draggable => draggable.emit('destroy'));
        }
    }

    handleDragStart(index: number) {
        const {id, dispatch, items, titles} = this.props;
        const {floatyContext: {float}} = this.context;
        this.draggables.splice(index, 1)[0].emit('destroy');
        float(items[index], titles[index]);
        dispatch(removeTab(id, index));
    }

    handleTabClick(index: number) {
        const {id, dispatch} = this.props;
        dispatch(setActiveTab(id, index));
    }

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        const headerElement = this.header;
        const headerBox = DomUtil.elementOffset(headerElement);
        if (DomUtil.isWithinBox(position, headerBox)) {
            const {dispatch, id, items} = this.props;
            for (let i = 0; i < items.length; i++) {
                const tabElement = this.tabs['tab-' + i];
                const tabBox = DomUtil.elementOffset(tabElement);
                if (DomUtil.isWithinBox(position, tabBox)) {
                    return {
                        x: tabBox.x,
                        y: tabBox.y,
                        width: tabBox.width,
                        height: tabBox.height,
                        execute: (item, title) => dispatch(insertTab(id, i, item, title)),
                        resolved: true
                    };
                }
            }
            return {
                x: headerBox.x,
                y: headerBox.y,
                width: headerBox.width,
                height: headerBox.height,
                execute: (item, title) => dispatch(insertTab(id, items.length, item, title)),
                resolved: true
            };
        } else {
            const containerElement = this.container;
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
        const {id, active, titles} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <ul className={theme['floaty-stack-header-tabs']}>
            {titles.map((title, index) =>
                <li key={index} ref={(r) => {
                    if (r !== null) {
                        this.tabs['tab-' + index] = r;
                    }
                }} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index === active})} onClick={() => this.handleTabClick(index)}>
                    <Item id={title} floatyStackId={id} floatyStackIndex={index}/>
                </li>
            )}
        </ul>;
    }

    renderHeader() {
        const {floatyContext: {theme}} = this.context;

        return <div ref={(r) => {
            if (r !== null) {
                this.header = r;
            }
        }} className={theme['floaty-stack-header']}>
            {this.renderTabs()}
        </div>;
    }

    render() {
        const {active, items, className, id, dispatch, titles, type, ...other} = this.props;
        const {floatyContext: {theme}} = this.context;

        return <div ref={r => {
            if (r !== null) {
                this.container = r;
            }
        }} className={classNames(theme['floaty-stack'], className)} {...other}>
            {this.renderHeader()}
            {0 <= active && active < items.length && <StackItem value={items[active]}/>}
        </div>;
    }
};

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Draggable from './Draggable';
import DomUtil from './DomUtil';
import shallowEqual from 'shallowequal';
import {noOperation, updateActiveTab, insertTab} from './actions';
import SplittablePanel from './SplittablePanel';

const noOp = () => undefined;

export default class Stack extends SplittablePanel {
    static propTypes = {
        active: React.PropTypes.number.isRequired,
        controls: React.PropTypes.any,
        dispatch: React.PropTypes.func.isRequired,
        float: React.PropTypes.func.isRequired,
        titles: React.PropTypes.array.isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    unmakeDraggablesImmediate = null;

    draggables = [];

    shouldComponentUpdate(nextProps, nextState, nextContent) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContent);
    }

    componentDidMount() {
        this.makeDraggables();
    }

    componentDidUpdate() {
        this.unmakeDraggables(this.makeDraggables.bind(this));
    }

    componentWillUnmount() {
        this.unmakeDraggables();
        clearImmediate(this.unmakeDraggablesImmediate);
    }

    makeDraggables() {
        for (let i = 0; i < React.Children.count(this.props.children); i++) {
            const draggable = Draggable(ReactDOM.findDOMNode(this.refs['tab-' + i]), 5);
            draggable.on('dragstart', this.handleDragStart.bind(this, i));
            this.draggables.push(draggable);
        }
    }

    unmakeDraggables(callback = noOp) {
        if (!!this.unmakeDraggablesImmediate) {
            clearImmediate(this.unmakeDraggablesImmediate);
        }

        if (this.draggables.length == 0) {
            this.unmakeDraggablesImmediate = setImmediate(callback);
        } else {
            let destroyedCount = 0;
            this.draggables.forEach(draggable => draggable.on('destroyed', () => {
                if (++destroyedCount == this.draggables.length) {
                    this.draggables = [];
                    this.unmakeDraggablesImmediate = setImmediate(callback);
                }
            }));
            this.draggables.forEach(draggable => draggable.emit('destroy'));
        }
    }

    handleDragStart(index, event) {
        // Remove draggable from this, and give control of it to 'above'
        const draggable = this.draggables.splice(index, 1)[0];
        this.props.float(index, event, this.props.dispatch, draggable);
    }

    handleTabClick(index) {
        this.props.dispatch(updateActiveTab(index));
    }

    renderActiveChild() {
        const {active, children} = this.props;
        return React.Children.toArray(children)[active];
    }

    dispatch(action) {
        this.props.dispatch(action);
    }

    resolveDropArea(position) {
        const headerElement = ReactDOM.findDOMNode(this.refs['header']);
        const headerBox = DomUtil.elementOffset(headerElement);
        if (DomUtil.isWithinBox(position, headerBox)) {
            const {children, dispatch} = this.props;
            for (let i = 0; i < React.Children.count(children); i++) {
                const tabElement = ReactDOM.findDOMNode(this.refs['tab-' + i]);
                const tabBox = DomUtil.elementOffset(tabElement);
                if (DomUtil.isWithinBox(position, tabBox)) {
                    return {...tabBox, dispatch: (item, name) => dispatch(insertTab(i, item, name)), resolved: true};
                }
            }
            return {...headerBox, dispatch: (item, name) => dispatch(insertTab(React.Children.count(this.props.children), item, name)), resolved: true};
        } else {
            const containerElement = ReactDOM.findDOMNode(this.refs['container']);
            const containerBox = DomUtil.elementOffset(containerElement);
            if (DomUtil.isWithinBox(position, containerBox)) {
                return this.split(position);
            } else {
                return {x: 0, y: 0, width: 0, height: 0, dispatch: noOperation, resolved: false};
            }
        }
    }

    renderTabs() {
        const {active, children, titles} = this.props;
        const {theme} = this.context;

        return <ul className={theme['floaty-stack-header-tabs']}>
            {React.Children.map(children, (child, index) =>
                <li key={index} ref={'tab-' + index} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index === active})} onClick={this.handleTabClick.bind(this, index)}>
                    {titles[index]}
                </li>
            )}
        </ul>;
    }

    renderControls() {
        const {controls, dispatch} = this.props;
        const {theme} = this.context;

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
        const {theme} = this.context;

        return <div ref="header" className={theme['floaty-stack-header']}>
            {this.renderTabs()}
            {this.renderControls()}
        </div>;
    }

    render() {
        const {active, children, className, dispatch, float, titles, ...other} = this.props;
        const {theme} = this.context;

        return <div ref="container" className={classNames(theme['floaty-stack'], className)} {...other}>
            {this.renderHeader()}
            {this.renderActiveChild()}
        </div>;
    }
};

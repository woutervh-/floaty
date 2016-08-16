import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Draggable from './Draggable';
import {removeTab, updateActiveTab} from './actions';

const noOp = () => undefined;

export default class Stack extends React.Component {
    static propTypes = {
        active: React.PropTypes.number.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        float: React.PropTypes.func.isRequired,
        names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    draggables = [];

    componentDidMount() {
        this.makeDraggables();
    }

    componentDidUpdate() {
        this.unmakeDraggables(this.makeDraggables.bind(this));
    }

    componentWillUnmount() {
        this.unmakeDraggables();
    }

    makeDraggables() {
        for (let i = 0; i < React.Children.count(this.props.children); i++) {
            const draggable = Draggable(ReactDOM.findDOMNode(this.refs['tab-' + i]), 5);
            draggable.on('dragstart', this.handleDragStart.bind(this, i));
            this.draggables.push(draggable);
        }
    }

    unmakeDraggables(callback = noOp) {
        if (this.draggables.length == 0) {
            setImmediate(callback);
        } else {
            let destroyedCount = 0;
            this.draggables.forEach(draggable => draggable.on('destroyed', () => {
                if (++destroyedCount == this.draggables.length) {
                    this.draggables = [];
                    setImmediate(callback);
                }
            }));
            this.draggables.forEach(draggable => draggable.emit('destroy'));
        }
    }

    handleDragStart(index, event) {
        // Remove draggable from this, and give control of it to 'above'
        const draggable = this.draggables.splice(index, 1)[0];
        this.props.float(index, event, draggable);

        // Remove item from the stack
        this.props.dispatch(removeTab(index));
    }

    handleTabClick(index) {
        this.props.dispatch(updateActiveTab(index));
    }

    renderActiveChild() {
        const {active, children} = this.props;
        return React.Children.toArray(children)[active];
    }

    render() {
        const {active, children, className, dispatch, float, names, ...other} = this.props;
        const {theme} = this.context;

        return <div className={classNames(theme['floaty-stack'], className)} {...other}>
            <div ref="header" className={theme['floaty-stack-header']}>
                <ul className={theme['floaty-stack-header-tabs']}>
                    {React.Children.map(this.props.children, (child, index) =>
                        <li ref={'tab-' + index} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index == active})} onClick={this.handleTabClick.bind(this, index)}>
                            {names[index]}
                        </li>
                    )}
                </ul>
            </div>
            {this.renderActiveChild()}
        </div>;
    }
};

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Draggable from './Draggable';
import DomUtil from './DomUtil';
import {updateActiveTab} from './actions';

// const noop = () => undefined;
//
// export default class Stack extends React.Component {
//     static contextTypes = {
//         theme: React.PropTypes.object.isRequired
//     };
//
//     state = {
//         active: 0
//     };
//
//     draggables = [];
//
//     componentDidMount() {
//         this.makeDraggables();
//     }
//
//     componentDidUpdate() {
//         this.unmakeDraggables(this.makeDraggables.bind(this));
//     }
//
//     componentWillUnmount() {
//         this.unmakeDraggables();
//     }
//
//     handleTabClick(index) {
//         this.setState({active: index});
//     }
//
//     renderActiveChild() {
//         const {children} = this.props;
//         return React.Children.toArray(children)[this.state.active];
//     }
//
//     unmakeDraggables(callback = noop) {
//         if (this.draggables.length == 0) {
//             setImmediate(callback);
//         } else {
//             let destroyedCount = 0;
//             this.draggables.forEach(draggable => draggable.on('destroyed', () => {
//                 if (++destroyedCount == this.draggables.length) {
//                     this.draggables = [];
//                     setImmediate(callback);
//                 }
//             }));
//             this.draggables.forEach(draggable => draggable.emit('destroy'));
//         }
//     }
//
//     makeDraggables() {
//         for (let i = 0; i < React.Children.count(this.props.children); i++) {
//             const draggable = Draggable(ReactDOM.findDOMNode(this.refs['tab-' + i]));
//             draggable.on('dragstart', this.handleDragStart.bind(this, i));
//             draggable.on('drag', this.handleDrag.bind(this, i));
//             draggable.on('dragstop', this.handleDragStop.bind(this, i));
//             this.draggables.push(draggable);
//         }
//     }
//
//     handleDragStart(index) {
//         // todo: send stuff to event bus
//         // MAKE SURE STATE/PROPS DON'T CHANGE HERE, IT WILL REBUILD THE DRAGGABLES
//         // OR: KEEP DRAGGABLES ALIVE WHILE STATE/PROPS CHANGE
//     }
//
//     handleDrag(index, event) {
//         // todo: send stuff to event bus
//     }
//
//     handleDragStop(index, event) {
//         // todo: send stuff to event bus
//     }
//
//     getDropArea(mouseX, mouseY) {
//         let area = undefined;
//         const {x, y, width, height} = DomUtil.elementOffset(this.refs['header']);
//         if (x <= mouseX && mouseX <= x + width && y <= mouseY && mouseY <= y + height) {
//             area = {x, y, width, height};
//         }
//         return area;
//     }
//
//     render() {
//         const {theme} = this.context;
//         const {children, className, ...other} = this.props;
//
//         return <div className={classNames(theme['floaty-stack'], className)} {...other}>
//             <div ref="header" className={theme['floaty-stack-header']}>
//                 <ul className={theme['floaty-stack-header-tabs']}>
//                     {React.Children.map(this.props.children, (child, index) =>
//                         <li ref={'tab-' + index} className={classNames(theme['floaty-stack-header-tabs-item'], {[theme['floaty-stack-header-tabs-item-active']]: index == this.state.active})} onClick={this.handleTabClick.bind(this, index)}>
//                             {child.props.title}
//                         </li>
//                     )}
//                 </ul>
//             </div>
//             {this.renderActiveChild()}
//         </div>;
//     }
// };

export default class Stack extends React.Component {
    static propTypes = {
        active: React.PropTypes.number.isRequired,
        dispatcher: React.PropTypes.func.isRequired,
        names: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    };

    static contextTypes = {
        theme: React.PropTypes.object.isRequired
    };

    handleTabClick(index) {
        this.props.dispatcher(updateActiveTab(index));
    }

    renderActiveChild() {
        const {active, children} = this.props;
        return React.Children.toArray(children)[active];
    }

    render() {
        const {active, children, className, dispatcher, names, ...other} = this.props;
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

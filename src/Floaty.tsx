import * as React from 'react';
import shallowEqual = require('shallowequal');
import {connect} from 'react-redux';
import * as Redux from 'redux';
import {Item, ItemBase} from './Item';
import {startFloating, stopFloating, setLayout} from './actions';
import {floatySelector} from './selectors';
import {floatyContextType} from './Types';
import getPosition from './getPosition';
import StackFloating from './StackFloating';
import * as DomUtil from './DomUtil';
import navigator from './navigator';
import {IFloatyState, IFloatyItem, IFloatyStack} from './reducers/index';
import {IDropAreaResolution} from './DropAreaTypes';

export interface IFloatyProps {
    refs: any;
    id: string;
    theme: any;
    selector?: (state: any) => IFloatyState;
    onClose: (item: IFloatyItem, title: any) => void;
}

export interface IFloatySelectedProps {
    item: string | undefined;
    floatingItem: string | null | undefined;
    floatingTitle: any | null | undefined;
    floaty: IFloatyState;
    isFloating: boolean;
}

export interface IFloatyComponentState {
    x: number,
    y: number,
    targetIndicator: {
        top: number,
        left: number,
        width: number,
        height: number
    };
    showTargetIndicator: boolean;
}

class Floaty extends React.Component<IFloatyProps & IFloatySelectedProps & {dispatch: Redux.Dispatch<IFloatyState>} & React.AllHTMLAttributes<HTMLDivElement>, IFloatyComponentState> {
    static defaultProps = {
        refs: {}
    };

    static childContextTypes = {
        floatyContext: floatyContextType
    };

    state = {
        x: 0,
        y: 0,
        targetIndicator: {
            top: 0,
            left: 0,
            width: 0,
            height: 0
        },
        showTargetIndicator: false
    };

    container: HTMLDivElement;

    item: ItemBase | null = null;

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }

    componentWillMount() {
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('mouseup', this.handleUp);
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
    }

    getChildContext() {
        return {
            floatyContext: {
                float: this.dragStart,
                refs: this.props.refs,
                theme: this.props.theme
            }
        };
    }

    handleMove = (event: MouseEvent) => {
        const {isFloating} = this.props;
        if (isFloating) {
            const {x, y} = getPosition(event);
            const {x: left, y: top, width, height, resolved} = this.resolveDropArea({x, y});
            if (resolved) {
                this.setState({x, y, showTargetIndicator: true, targetIndicator: {top, left, width, height}});
            } else {
                this.setState({x, y, showTargetIndicator: false});
            }
        }
    };

    handleUp = () => {
        const {isFloating} = this.props;
        if (isFloating) {
            const {dispatch, id, theme} = this.props;
            const {x, y} = this.state;

            document.body.classList.remove(theme['floaty-unselectable']);
            const resolution = this.resolveDropArea({x, y});
            const {floatingItem, floatingTitle, floaty, onClose} = this.props;
            if (floatingItem && floatingTitle) {
                if (resolution.resolved && resolution.execute !== undefined) {
                    resolution.execute(floatingItem, floatingTitle);
                    dispatch(stopFloating(id));
                } else {
                    dispatch(stopFloating(id));
                    if (onClose) {
                        onClose(
                            floaty.items[floatingItem] || floatingItem,
                            floaty.items[floatingTitle] || floatingTitle
                        );
                    }
                }
            }
        }
    };

    dragStart = (item: string, title: any) => {
        const {dispatch, id, theme} = this.props;
        dispatch(startFloating(id, item, title));
        document.body.classList.add(theme['floaty-unselectable']);
    };

    navigator() {
        const {floaty, id} = this.props;
        return navigator(floaty, id);
    }

    renderFloatingStack() {
        const {floatingItem: item, floatingTitle: title} = this.props;
        const {x, y} = this.state;
        const {scrollX, scrollY} = window;
        return <StackFloating title={title} item={item} x={x - scrollX} y={y - scrollY} />;
    }

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        if (this.item) {
            return this.item.resolveDropArea(position);
        } else {
            const {dispatch, id, floaty} = this.props;
            const box = DomUtil.elementOffset(this.container);
            return {
                x: box.x,
                y: box.y,
                width: box.width,
                height: box.height,
                resolved: true,
                execute: (item, title) => dispatch(setLayout(id, {type: 'stack', items: [item], titles: [title]} as IFloatyStack))
            } as IDropAreaResolution;
        }
    }

    renderDropArea() {
        const {theme} = this.props;
        const {showTargetIndicator} = this.state;
        if (showTargetIndicator) {
            const {targetIndicator: {left, top, width, height}} = this.state;
            const {scrollX, scrollY} = window;
            return <div className={theme['floaty-target-indicator']} style={{top: top - scrollY, left: left - scrollX, width, height}} />;
        }
    }

    render() {
        const {children, dispatch, id, item, refs, floaty, theme, isFloating, floatingItem, floatingTitle, onClose, ...other} = this.props;

        return <div ref={r => {
            if (r !== null) {
                this.container = r;
            }
        }} {...other}>
            {item && <Item ref={(r: any) => {
                if (r !== null) {
                    this.item = (r as {[key: string]: any})['wrappedInstance'] as ItemBase;
                } else {
                    this.item = r;
                }
            }} id={item} />}
            {isFloating && this.renderFloatingStack()}
            {isFloating && this.renderDropArea()}
        </div>;
    }
}

export default connect(floatySelector, undefined, undefined, {pure: false})(Floaty);

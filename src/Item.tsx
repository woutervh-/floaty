import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Redux from 'redux';
import shallowEqual = require('shallowequal');
import {connect} from 'react-redux';
import Column from './Column';
import Row from './Row';
import Stack from './Stack';
import {itemSelector} from './selectors';
import {floatyContextType, IFloatyContext} from './Types';
import split from './split';
import {IFloatyItem, IFloatyState} from './reducers/index';
import {IResolvableDropArea, IDropAreaResolution} from './DropAreaTypes';

export interface IFloatyItemProps {
    id: string;
    floatyStackId?: string;
    floatyStackIndex?: number;
}

export interface IFloatyItemSelectedProps extends IFloatyItem {
    name?: string;
    content?: any;
    type: string;
}

// IFloatyItemProps & IFloatyItemSelectedProps & React.Props<ItemBase> & {dispatch: Redux.Dispatch<IFloatyState>}

export class ItemBase extends React.Component<any, any> implements IResolvableDropArea {
    static contextTypes = {
        floatyContext: floatyContextType
    };

    context: {floatyContext: IFloatyContext};

    item: IResolvableDropArea;

    shouldComponentUpdate(nextProps: any, _: any, nextContext: any) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.context, nextContext);
    }

    resolveDropArea(position: {x: number, y: number}): IDropAreaResolution {
        const {type} = this.props;

        switch (type) {
            case 'column':
            case 'row':
            case 'stack':
                return this.item.resolveDropArea(position);
            default:
                const {id, dispatch} = this.props;
                return split(ReactDOM.findDOMNode(this), position, id, dispatch);
        }
    }

    renderLeafComponent(): React.ReactElement<any> | null {
        const {type, state = {}, name, content, id, ...other} = this.props;
        const {floatyContext: {refs}} = this.context;

        let result = null;
        switch (type) {
            case 'prop-ref':
                if (name !== undefined) {
                    result = refs[name];
                }
                break;
            case 'text':
                result = <span>{content}</span>;
                break;
            default:
                throw new Error(`Unknown leaf component type: ${type}`);
        }
        if (React.isValidElement(result)) {
            return React.cloneElement(result, {...other, floatyId: id, ...state});
        } else if (typeof result === 'function') {
            return result({...other, floatyId: id, ...state}) as JSX.Element;
        } else {
            return result;
        }
    }

    render(): React.ReactElement<any> | null {
        const {type} = this.props;

        switch (type) {
            case 'column':
                return <Column ref={r => {
                    if (r !== null) {
                        this.item = r;
                    }
                }} {...this.props}/>;
            case 'row':
                return <Row ref={r => {
                    if (r !== null) {
                        this.item = r;
                    }
                }} {...this.props}/>;
            case 'stack':
                return <Stack ref={r => {
                    if (r !== null) {
                        this.item = r;
                    }
                }} {...this.props}/>;
            default:
                return this.renderLeafComponent();
        }
    }
}

export const Item = connect(itemSelector, undefined, undefined, {withRef: true, pure: false})(ItemBase);

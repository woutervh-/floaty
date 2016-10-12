import React from 'react';
import ReactDOM from 'react-dom';
import connect from 'react-redux/lib/components/connect';
import Column from './Column';
import Row from './Row';
import Stack from './Stack';
import {itemSelector} from './selectors';
import {floatyContextType} from './Types';
import split from './split';

class Item extends React.Component {
    static propTypes = {
        id: React.PropTypes.any.isRequired
    };

    static contextTypes = {
        floatyContext: floatyContextType
    };

    resolveDropArea(position) {
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

    renderLeafComponent() {
        const {type, state = {}, name, content, ...other} = this.props;
        const {floatyContext: {refs}} = this.context;

        let result;
        switch (type) {
            case 'prop-ref':
                result = refs[name];
                break;
            case 'component':
                result = content;
                break;
            default:
                throw new Error(`Unknown leaf component type: ${type}`);
        }
        if (React.isValidElement(result)) {
            return React.cloneElement(result, {...other, ...state});
        } else if (typeof result === 'function') {
            return result({...other, ...state});
        } else {
            return result;
        }
    }

    render() {
        const {type} = this.props;

        switch (type) {
            case 'column':
                return <Column ref={r => this.item = r} {...this.props}/>;
            case 'row':
                return <Row ref={r => this.item = r} {...this.props}/>;
            case 'stack':
                return <Stack ref={r => this.item = r} {...this.props}/>;
            default:
                return this.renderLeafComponent();
        }
    }
}

export default connect(itemSelector, undefined, undefined, {withRef: true})(Item);

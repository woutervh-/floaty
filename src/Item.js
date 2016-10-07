import React from 'react';
import connect from 'react-redux/lib/components/connect';
import Column from './Column';
import Row from './Row';
import Stack from './Stack';
import {itemSelector} from './selectors';

class Item extends React.Component {
    static propTypes = {
        id: React.PropTypes.number.isRequired,
        item: React.PropTypes.object.isRequired
    };

    static contextTypes = {
        floatyContext: React.PropTypes.shape({
            refs: React.PropTypes.object.isRequired,
            theme: React.PropTypes.object.isRequired
        }).isRequired
    };

    renderLeafComponent() {
        const {type} = this.props;
        const {floatyContext: {refs}} = this.context;

        let result;
        switch (type) {
            case 'prop-ref':
                const {name} = this.props;
                result = refs[name];
                break;
            case 'component':
                const {content} = this.props;
                result = content;
                break;
            default:
                throw new Error(`Unknown leaf component type: ${type}`);
        }
        const {state} = this.props;
        if (state && React.isValidElement(result)) {
            return React.cloneElement(result, {...state});
        } else if (state && typeof result === 'function') {
            return result(state);
        } else {
            return result;
        }
    }

    render() {
        const {type} = this.props;

        switch (type) {
            case 'column':
                const {column} = this.props;
                return <Column id={column}/>;
            case 'row':
                const {row} = this.props;
                return <Row id={row}/>;
            case 'stack':
                const {stack} = this.props;
                return <Stack id={stack}/>;
            default:
                return this.renderLeafComponent();
        }
    }
}

export default connect(itemSelector)(Item);

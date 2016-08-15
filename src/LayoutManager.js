import React from 'react';
import ContextProvider from './ContextProvider';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackItem from './StackItem';

export default function LayoutManager(layout = {content: ''}) {
    return class FloatyComponent extends React.Component {
        static propTypes = {
            theme: React.PropTypes.object.isRequired
        };

        renderGeneric(genericObject) {
            switch (genericObject.type) {
                case 'row':
                    return this.renderRow(genericObject);
                case 'stack':
                    return this.renderStack(genericObject);
                case 'prop-ref':
                    return this.props[genericObject.name];
                default:
                    return genericObject.content;
            }
        }

        renderRow(rowObject) {
            return <Row {...rowObject.props}>{rowObject.items.map(this.renderRowItem.bind(this))}</Row>;
        }

        renderRowItem(rowItemObject, index) {
            return <RowItem key={index} {...rowItemObject.props}>{this.renderGeneric(rowItemObject)}</RowItem>;
        }

        renderStack(stackObject) {
            return <Stack {...stackObject.props}>{stackObject.items.map(this.renderStackItem.bind(this))}</Stack>;
        }

        renderStackItem(stackItemObject, index) {
            return <StackItem key={index} {...stackItemObject.props} title={stackItemObject.title}>{this.renderGeneric(stackItemObject)}</StackItem>;
        }

        render() {
            return <ContextProvider theme={this.props.theme}>
                {this.renderGeneric(layout)}
            </ContextProvider>;
        }
    };
};

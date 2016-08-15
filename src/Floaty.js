import React from 'react';
import ContextProvider from './ContextProvider';
import Row from './Row';
import RowItem from './RowItem';
import Stack from './Stack';
import StackItem from './StackItem';

function renderGeneric(genericObject) {
    switch (genericObject.type) {
        case 'row':
            return renderRow(genericObject);
        case 'stack':
            return renderStack(genericObject);
        default:
            return genericObject.content;
    }
}

function renderRow(rowObject) {
    return <Row {...rowObject.props}>{rowObject.items.map(renderRowItem)}</Row>;
}

function renderRowItem(rowItemObject, index) {
    return <RowItem key={index} {...rowItemObject.props}>{renderGeneric(rowItemObject)}</RowItem>;
}

function renderStack(stackObject) {
    return <Stack {...stackObject.props}>{stackObject.items.map(renderStackItem)}</Stack>;
}

function renderStackItem(stackItemObject, index) {
    return <StackItem key={index} {...stackItemObject.props} title={stackItemObject.title}>{renderGeneric(stackItemObject)}</StackItem>;
}

export default function Floaty({layout, dispatcher, theme}) {
    return <ContextProvider dispatcher={dispatcher} theme={theme}>
        {renderGeneric(layout)}
    </ContextProvider>;
};

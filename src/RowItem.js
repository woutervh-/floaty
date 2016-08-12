import React from 'react';

export default class RowItem extends React.Component {
    render() {
        const {children, ...other} = this.props;

        return <div {...other}>
            {children}
        </div>;
    }
};

import * as React from 'react';

export interface IFloatyContext {
    float: (item: string, title: any) => void,
    theme: any,
    refs: any
}

export const floatyContextType = React.PropTypes.shape({
    float: React.PropTypes.func.isRequired,
    theme: React.PropTypes.object.isRequired,
    refs: React.PropTypes.object.isRequired
}).isRequired;

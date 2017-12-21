import * as React from 'react';
import PropTypes from 'prop-types';

export interface IFloatyContext {
    float: (item: string, title: any) => void,
    theme: any,
    refs: any
}

export const floatyContextType = PropTypes.shape({
    float: PropTypes.func.isRequired,
    theme: PropTypes.object.isRequired,
    refs: PropTypes.object.isRequired
}).isRequired;

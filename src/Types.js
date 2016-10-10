import React from 'react';

export const floatyContextType = React.PropTypes.shape({
    float: React.PropTypes.func.isRequired,
    theme: React.PropTypes.object.isRequired,
    refs: React.PropTypes.object.isRequired
}).isRequired;

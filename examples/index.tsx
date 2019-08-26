import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './app';

const div = document.createElement('div');
document.body.appendChild(div);

ReactDOM.render(<App />, div);

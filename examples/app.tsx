import * as React from 'react';
import { Floaty, FloatyRenderers, Renderers, State } from '../src';

export class App extends React.PureComponent<{}, State> {
    public state: State = {
        layout: {
            type: 'row',
            items: [{
                key: 'A',
                fraction: 0.5,
                child: {
                    type: 'stack',
                    active: 0,
                    items: [{
                        identifier: 'A1'
                    }]
                }
            }, {
                key: 'B',
                fraction: 0.5,
                child: {
                    type: 'column',
                    items: [{
                        key: 'B1',
                        fraction: 0.5,
                        child: {
                            type: 'stack',
                            active: 0,
                            items: [{
                                identifier: 'B1'
                            }]
                        }
                    }, {
                        key: 'B2',
                        fraction: 0.5,
                        child: {
                            type: 'stack',
                            active: 0,
                            items: [{
                                identifier: 'B2'
                            }, {
                                identifier: 'B3'
                            }]
                        }
                    }]
                }
            }]
        },
        floating: null
    };

    private floatyRenderers: FloatyRenderers = {
        columnRenderer: Renderers.ColumnRenderer,
        columnSeparatorRenderer: Renderers.ColumnSeparatorRenderer,
        contentRenderer: (props) => <div>Content: {props.stackItem.identifier}</div>,
        floatingRenderer: Renderers.FloatingRenderer,
        floatingContentRenderer: (props) => <div>Preview of: {props.stackItem.identifier}</div>,
        floatingTabRenderer: (props) => <div>Floating tab: {props.stackItem.identifier}</div>,
        layoutRenderer: Renderers.LayoutRenderer,
        rowRenderer: Renderers.RowRenderer,
        rowSeparatorRenderer: Renderers.RowSeparatorRenderer,
        stackRenderer: Renderers.StackRenderer,
        tabRenderer: (props) => <div>
            Tab: {props.stackItem.identifier}
            <button onClick={() => props.floatyManager.onActivate(props.stackItem)} disabled={props.stack.items.length <= 1 || props.stack.active === props.stackIndex}>•</button>
            <button onClick={() => props.floatyManager.onClose(props.stackItem)}>×</button>
        </div>
    };

    public render() {
        return <React.Fragment>
            <div style={{ width: 500, height: 500 }}>
                <Floaty
                    floatyRenderers={this.floatyRenderers}
                    state={this.state}
                    onStateChange={this.handleStateChange}
                />
            </div>
            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </React.Fragment>;
    }

    private handleStateChange = (state: State) => this.setState(state);
}

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
                        key: 'A1',
                        content: { identifier: 'A1' },
                        tab: { identifier: 'A1' }
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
                                key: 'B1',
                                content: { identifier: 'B1' },
                                tab: { identifier: 'B1' }
                            }]
                        }
                    }, {
                        key: 'B2',
                        fraction: 0.5,
                        child: {
                            type: 'stack',
                            active: 0,
                            items: [{
                                key: 'B2',
                                content: { identifier: 'B2' },
                                tab: { identifier: 'B2' }
                            }, {
                                key: 'B3',
                                content: { identifier: 'B3' },
                                tab: { identifier: 'B3' }
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
        contentRenderer: (props) => <div>Content: {props.stackItem.content.identifier}</div>,
        floatingRenderer: Renderers.FloatingRenderer,
        floatingContentRenderer: (props) => <div>Preview of: {props.stackItem.content.identifier}</div>,
        floatingTabRenderer: (props) => <div>Floating tab: {props.stackItem.tab.identifier}</div>,
        layoutRenderer: Renderers.LayoutRenderer,
        rowRenderer: Renderers.RowRenderer,
        rowSeparatorRenderer: Renderers.RowSeparatorRenderer,
        stackRenderer: Renderers.StackRenderer,
        tabRenderer: (props) => <div>
            Tab: {props.stackItem.tab.identifier}
            <button onClick={() => props.stateManager.onActivate(props.stackItem)}>•</button>
            <button onClick={() => props.stateManager.onClose(props.stackItem)}>×</button>
        </div>
    };

    public render() {
        return <div style={{ width: 500, height: 500 }}>
            <Floaty
                floatyRenderers={this.floatyRenderers}
                state={this.state}
                onStateChange={this.handleStateChange}
            />
            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </div>;
    }

    private handleStateChange = (state: State) => this.setState(state);
}

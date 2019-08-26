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
                    type: 'stack',
                    active: 0,
                    items: [{
                        key: 'B1',
                        content: { identifier: 'B1' },
                        tab: { identifier: 'B1' }
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
        tabRenderer: (props) => <div>Tab: {props.stackItem.tab.identifier}</div>
    };

    public render() {
        return <Floaty
            floatyRenderers={this.floatyRenderers}
            state={this.state}
            onStateChange={this.handleStateChange}
        />;
    }

    private handleStateChange = (state: State) => this.setState(state);
}

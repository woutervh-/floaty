import * as React from 'react';
import { Floaty, FloatyRenderers, Renderers, State } from '../../src';

export class Basic extends React.PureComponent<{}, State> {
    public state: State = {
        layout: {
            type: 'row',
            items: [{
                fraction: 1 / 3,
                child: {
                    type: 'stack',
                    active: 0,
                    items: [{
                        identifier: 'A1'
                    }]
                }
            }, {
                fraction: 1 / 3,
                child: {
                    type: 'column',
                    items: [{
                        fraction: 1 / 2,
                        child: {
                            type: 'stack',
                            active: 0,
                            items: [{
                                identifier: 'B1'
                            }]
                        }
                    }, {
                        fraction: 1 / 2,
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
            }, {
                fraction: 1 / 3,
                child: {
                    type: 'stack',
                    active: 0,
                    items: [{
                        identifier: 'C1'
                    }]
                }
            }]
        },
        floating: null
    };

    private floatyRenderers: FloatyRenderers = {
        columnRenderer: Renderers.ColumnRenderer,
        columnSeparatorHandleRenderer: Renderers.ColumnSeperatorHandleRenderer,
        columnSeparatorRenderer: Renderers.ColumnSeparatorRenderer,
        contentRenderer: React.memo((props) =>
            <div>Content: {props.stackItem.identifier}</div>
        ),
        floatingRenderer: Renderers.FloatingRenderer,
        floatingContentRenderer: React.memo((props) =>
            <div>Preview of: {props.stackItem.identifier}</div>
        ),
        floatingTabRenderer: React.memo((props) =>
            <div>Floating tab: {props.stackItem.identifier}</div>
        ),
        dropAreaRenderer: Renderers.DropAreaRenderer,
        layoutRenderer: Renderers.LayoutRenderer,
        rowRenderer: Renderers.RowRenderer,
        rowSeparatorHandleRenderer: Renderers.RowSeperatorHandleRenderer,
        rowSeparatorRenderer: Renderers.RowSeparatorRenderer,
        stackRenderer: Renderers.StackRenderer,
        tabRenderer: React.memo((props) =>
            <div>
                Tab: {props.stackItem.identifier}
                <button onClick={() => props.floatyManager.onActivate(props.stackItem)} disabled={props.stack.items.length <= 1 || props.stack.active === props.stackItemIndex}>
                    •
                </button>
                <button onClick={() => props.floatyManager.onCloseTab(props.stackItem)}>
                    ×
                </button>
                <button onClick={() => props.floatyManager.onStartFloat(props.stackItem)}>
                    ↗
                </button>
            </div>
        ),
        tabFillerRenderer: Renderers.TabFillerRenderer
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

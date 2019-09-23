import * as React from 'react';
import { Floaty, FloatyRenderers, State } from '../../src';
import { defaultRenderers } from '../../src/default-renderers';

export class Basic extends React.PureComponent<{}, State<string>> {
    public state: State<string> = {
        layout: {
            type: 'row',
            items: [{
                fraction: 1 / 3,
                child: {
                    type: 'stack',
                    active: 0,
                    items: [{
                        key: 'a',
                        item: 'a'
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
                                key: 'b',
                                item: 'b'
                            }]
                        }
                    }, {
                        fraction: 1 / 2,
                        child: {
                            type: 'stack',
                            active: 0,
                            items: [{
                                key: 'c',
                                item: 'c'
                            }, {
                                key: 'd',
                                item: 'd'
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
                        key: 'e',
                        item: 'e'
                    }]
                }
            }]
        },
        floating: {
            key: 'f',
            item: 'f'
        }
    };

    private floatyRenderers: FloatyRenderers<string> = {
        ...defaultRenderers,
        contentRenderer: React.memo((props) =>
            <div>Content: {props.stackItem.item}</div>
        ),
        floatingContentRenderer: React.memo((props) =>
            <div>Preview of: {props.stackItem.item}</div>
        ),
        floatingTabRenderer: React.memo((props) =>
            <div>Floating tab: {props.stackItem.item}</div>
        ),
        tabRenderer: React.memo((props) =>
            <div>
                Tab: {props.stackItem.item}
                <button onClick={() => props.floatyManager.onActivate(props.stackItem)} disabled={props.stack.items.length <= 1 || props.stack.active === props.stackItemIndex}>
                    •
                </button>
                <button onClick={() => props.floatyManager.onCloseTab(props.stackItem)}>
                    ×
                </button>
                <button onClick={(event) => props.floatyManager.onStartFloat(props.stackItem, { event: event.nativeEvent, eventTarget: document.body })}>
                    ↗
                </button>
            </div>
        )
    };

    public render() {
        return <React.Fragment>
            <div style={{ width: 500, height: 500 }}>
                <Floaty
                    renderers={this.floatyRenderers}
                    state={this.state}
                    onStateChange={this.handleStateChange}
                />
            </div>
            <pre>
                {JSON.stringify(this.state, null, 2)}
            </pre>
        </React.Fragment>;
    }

    private handleStateChange = (state: State<string>) => this.setState(state);
}

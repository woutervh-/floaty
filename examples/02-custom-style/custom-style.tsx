import classNames from 'classnames';
import * as React from 'react';
import { Floaty, FloatyRenderers, Renderers, State } from '../../src';
import { Fruit } from './fruit';
import './style.css';

export class CustomStyle extends React.PureComponent<{}, State> {
    public state: State = {
        layout: {
            type: 'stack',
            active: 0,
            items: [
                { identifier: 'Apple' },
                { identifier: 'Banana' },
                { identifier: 'Cherries' }
            ]
        },
        floating: null
    };

    private floatyRenderers: FloatyRenderers = {
        columnRenderer: Renderers.ColumnRenderer,
        columnSeparatorHandleRenderer: React.memo((props) =>
            <div className={classNames('example02-resize-handle', 'example02-resize-handle-column')} style={{ top: props.offset, left: 0 }} />
        ),
        columnSeparatorRenderer: Renderers.ColumnSeparatorRenderer,
        contentRenderer: React.memo((props) =>
            <div className="example02-content">
                <div className="example02-fruit" onMouseDown={(event) => event.button === 0 && props.floatyManager.onStartFloat(props.stackItem)}>
                    <Fruit fruit={props.stackItem.identifier} />
                </div>
            </div>
        ),
        floatingRenderer: Renderers.FloatingRenderer,
        floatingContentRenderer: React.memo((props) =>
            <React.Fragment>
                <div>You've got: <Fruit fruit={props.stackItem.identifier} /></div>
                <div>Drop it somewhere!</div>
            </React.Fragment>
        ),
        floatingTabRenderer: () => null,
        dropAreaRenderer: React.memo((props) =>
            <div className="example02-drop-area" style={{ top: props.dropArea.top, left: props.dropArea.left, width: props.dropArea.width, height: props.dropArea.height }} />
        ),
        layoutRenderer: Renderers.LayoutRenderer,
        rowRenderer: Renderers.RowRenderer,
        rowSeparatorHandleRenderer: React.memo((props) =>
            <div className={classNames('example02-resize-handle', 'example02-resize-handle-row')} style={{ top: 0, left: props.offset }} />
        ),
        rowSeparatorRenderer: Renderers.RowSeparatorRenderer,
        stackRenderer: Renderers.StackRenderer,
        tabRenderer: React.memo((props) =>
            <div className="example02-tab">
                <button className={classNames('example02-button', { active: props.stack.active === props.stackItemIndex })} onClick={() => props.floatyManager.onActivate(props.stackItem)}>
                    {props.stackItem.identifier}
                </button>
            </div>
        ),
        tabFillerRenderer: React.memo((props) =>
            <div className="example02-tab" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button className="example02-button" onClick={() => props.floatyManager.onCloseTab(props.stack.items[props.stack.active])}>
                    Close
                </button>
            </div>
        )
    };

    public render() {
        return <React.Fragment>
            <div className="example02-container">
                <Floaty
                    floatyRenderers={this.floatyRenderers}
                    state={this.state}
                    onStateChange={this.handleStateChange}
                />
            </div>
        </React.Fragment>;
    }

    private handleStateChange = (state: State) => this.setState(state);
}

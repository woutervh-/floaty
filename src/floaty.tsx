import * as React from 'react';
import * as Model from './model';
import * as RenderersModel from './renderers-model';
import { StateManager } from './state-manager';

interface Props {
    state: Model.State;
    onStateChange: (state: Model.State) => void;
    floatyRenderers: RenderersModel.FloatyRenderers;
}

export class Floaty extends React.PureComponent<Props, never> implements StateManager {
    public render() {
        return <React.Fragment>
            <this.props.floatyRenderers.layoutRenderer floatyRenderers={this.props.floatyRenderers} stateManager={this} layout={this.props.state.layout} />
            <this.props.floatyRenderers.floatingRenderer floatyRenderers={this.props.floatyRenderers} stateManager={this} floating={this.props.state.floating} />
        </React.Fragment>;
    }

    private onLayoutChange(layout: Model.Layout) {
        const newState: Model.State = {
            ...this.props.state,
            layout
        };
        this.props.onStateChange(newState);
    }

    private onRowOrColumnUpdateFractions = (rowOrColumn: Model.Column | Model.Row, index1: number, fraction1: number, index2: number, fraction2: number) => {
        const path = this.findPath(rowOrColumn, this.props.state.layout);
        if (!path) {
            if (rowOrColumn.type === 'column') {
                throw new Error('Column not found.');
            } else {
                throw new Error('Row not found.');
            }
        }

        const items = rowOrColumn.items.slice();
        items[index1] = { ...items[index1], fraction: fraction1 };
        items[index2] = { ...items[index2], fraction: fraction2 };
        const newRowOrColumn = { ...rowOrColumn, items };
        this.replaceInPath(newRowOrColumn, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    public onColumnUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onRowUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onActivate = (stack: Model.Stack, index: number) => {
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const newStack = { ...stack, active: index };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    public onStartFloat = (stack: Model.Stack, index: number) => {
        if (this.props.state.floating) {
            return;
        }

        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const items = stack.items.slice();
        items.splice(index, 1);
        const newStack = { ...stack, items, active: Math.min(stack.items.length - 1, index) };
        this.replaceInPath(newStack, path);

        const newState: Model.State = {
            layout: path[path.length - 1],
            floating: stack.items[index]
        };
        this.props.onStateChange(newState);
    }

    private replaceInPath(target: Model.Layout, path: Model.Layout[]) {
        let previous = path[0];
        path[0] = target;
        for (let i = 1; i < path.length; i++) {
            // The first item of the path can be a Stack, but the rest are always Columns and Rows.
            const node = path[i] as Model.Column | Model.Row;
            const index = node.items.findIndex((item) => item.child === previous);
            const items = node.items.slice();
            items[index] = { ...items[index], child: path[i - 1] };
            previous = path[i];
            path[i] = { ...node, items };
        }
    }

    private findPath(target: Model.Layout, from: Model.Layout): Model.Layout[] | null {
        if (target === from) {
            return [target];
        }
        switch (from.type) {
            case 'column':
            case 'row': {
                for (const item of from.items) {
                    const found = this.findPath(target, item.child);
                    if (found) {
                        return [...found, from];
                    }
                }
                break;
            }
        }
        return null;
    }
}

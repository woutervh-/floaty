import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactManagedDragable from 'react-managed-draggable';
import * as DropModel from './drop-model';
import { FloatyManager } from './floaty-manager';
import * as Model from './model';
import * as RenderersModel from './renderers-model';

interface Props {
    state: Model.State;
    onStateChange: (state: Model.State) => void;
    floatyRenderers: RenderersModel.FloatyRenderers;
}

interface State {
    currentMousePosition: ReactManagedDragable.XY | null;
    dropResolutions: DropModel.DropResolution[];
}

export class Floaty extends React.PureComponent<Props, State> implements FloatyManager {
    public state: State = {
        currentMousePosition: null,
        dropResolutions: []
    };
    private lastMousePosition: ReactManagedDragable.XY | null = null;
    private portal = document.createElement('div');
    private dropResolutions: Map<unknown, DropModel.DropResolution[]> = new Map();

    public componentDidMount() {
        document.addEventListener('mousemove', this.handleMove);
        document.addEventListener('touchmove', this.handleMove);
        document.addEventListener('mouseup', this.handleUp);
        document.addEventListener('touchend', this.handleUp);
        document.body.appendChild(this.portal);
    }

    public componentWillUnmount() {
        document.body.removeChild(this.portal);
        document.removeEventListener('mousemove', this.handleMove);
        document.removeEventListener('touchmove', this.handleMove);
        document.removeEventListener('mouseup', this.handleUp);
        document.removeEventListener('touchend', this.handleUp);
    }

    public render() {
        return <React.Fragment>
            {this.renderLayout()}
            {this.renderFloating()}
        </React.Fragment>;
    }

    private renderLayout() {
        if (this.props.state.layout) {
            return <this.props.floatyRenderers.layoutRenderer
                floatyRenderers={this.props.floatyRenderers}
                floatyManager={this}
                layout={this.props.state.layout}
            />;
        }
    }

    private renderFloating() {
        if (this.props.state.floating && this.state.currentMousePosition) {
            return ReactDOM.createPortal(
                <React.Fragment>
                    <div style={{ position: 'fixed', top: this.state.currentMousePosition.y, left: this.state.currentMousePosition.x }}>
                        <this.props.floatyRenderers.floatingRenderer
                            floatyRenderers={this.props.floatyRenderers}
                            floatyManager={this}
                            floating={this.props.state.floating}
                        />
                    </div>
                    {this.state.dropResolutions.map((dropResolution, index) => {
                        return <div style={{
                            position: 'fixed',
                            top: dropResolution.dropArea.top,
                            left: dropResolution.dropArea.left,
                            width: dropResolution.dropArea.width,
                            height: dropResolution.dropArea.height,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                        }}>{index} - {dropResolution.type}</div>;
                    })}
                </React.Fragment>,
                this.portal
            );
        }
    }

    private updateState(state: Model.State) {
        this.props.onStateChange({ ...state, layout: Floaty.minimizeLayout(state.layout) });
    }

    private onLayoutChange(layout: Model.Layout) {
        const newState: Model.State = {
            ...this.props.state,
            layout
        };
        this.updateState(newState);
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

    public registerDropResolutions = (key: unknown, dropResolutions: DropModel.DropResolution[]) => {
        this.dropResolutions.set(key, dropResolutions);
        this.updateDropResolutions();
    }

    public unregisterDropResolutions = (key: unknown) => {
        this.dropResolutions.delete(key);
        this.updateDropResolutions();
    }

    private updateDropResolutions() {
        const dropResolutions: DropModel.DropResolution[] = [];
        for (const dropResolution of this.dropResolutions.values()) {
            dropResolutions.push(...dropResolution);
        }
        this.setState({ dropResolutions });
    }

    public onColumnUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onRowUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onActivate = (stackItem: Model.StackItem) => {
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.identifier} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const newStack = { ...stack, active: index };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    public onCloseTab = (stackItem: Model.StackItem) => {
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.identifier} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const items = stack.items.slice();
        items.splice(index, 1);
        const newStack = { ...stack, items, active: Math.min(items.length - 1, stack.active) };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    private handleMove = (event: MouseEvent | TouchEvent) => {
        const position = ReactManagedDragable.getPosition(event);
        if (this.props.state.floating) {
            this.setState({ currentMousePosition: position });
        } else {
            this.lastMousePosition = position;
        }
    }

    private handleUp = () => {
        if (this.props.state.floating) {
            console.log('stop floating');
            // TODO: resolve drop area
            // Option 1: this.layout.resolveDropArea(...)
            // Option 2: this.registeredDropAreas.find((area) => ...)
            // Option 3: pass props to components: isFloating, registerDropArea, mousePosition
        }
    }

    public onStartFloat = (stackItem: Model.StackItem) => {
        if (this.props.state.floating) {
            return;
        }
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.identifier} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const items = stack.items.slice();
        items.splice(index, 1);
        const newStack = { ...stack, items, active: Math.min(items.length - 1, stack.active) };
        this.replaceInPath(newStack, path);

        // Update floating position.
        this.setState({ currentMousePosition: this.lastMousePosition });

        // Update controlled state.
        const newState: Model.State = {
            layout: path[path.length - 1],
            floating: stack.items[index]
        };
        this.updateState(newState);
    }

    public getLayout = () => {
        return this.props.state.layout;
    }

    public findStack = (stackItem: Model.StackItem): Model.Stack | null => {
        return Floaty.findStack(stackItem, this.getLayout());
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

    private findPath(target: Model.Layout, from: Model.Layout | null): Model.Layout[] | null {
        if (from === null) {
            return null;
        }
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

    private static minimizeLayout(layout: Model.Layout | null): Model.Layout | null {
        if (layout === null) {
            return null;
        }
        switch (layout.type) {
            case 'column':
            case 'row': {
                const type = layout.type;
                const items: Model.ColumnOrRowItem[] = [];
                let changed = false;
                for (const item of layout.items) {
                    const result = this.minimizeLayout(item.child);
                    if (result !== item.child) {
                        changed = true;
                    }
                    if (result) {
                        if (result.type === type) {
                            const sumFractions = result.items.map((item) => item.fraction).reduce((sum, fraction) => sum + fraction);
                            const normalizedFractions = result.items.map((item) => item.fraction / sumFractions);
                            for (let i = 0; i < result.items.length; i++) {
                                items.push({ ...result.items[i], fraction: normalizedFractions[i] });
                            }
                        } else {
                            items.push({ ...item, child: result });
                        }
                    }
                }
                if (items.length >= 2) {
                    if (changed) {
                        return { ...layout, items };
                    } else {
                        return layout;
                    }
                } else if (items.length === 1) {
                    return items[0].child;
                } else {
                    return null;
                }
            }
            case 'stack': {
                if (layout.items.length >= 1) {
                    return layout;
                } else {
                    return null;
                }
            }
        }
    }

    private static findStack(stackItem: Model.StackItem, from: Model.Layout | null): Model.Stack | null {
        if (from === null) {
            return null;
        }
        switch (from.type) {
            case 'column':
            case 'row': {
                for (const item of from.items) {
                    const found = Floaty.findStack(stackItem, item.child);
                    if (found) {
                        return found;
                    }
                }
                break;
            }
            case 'stack': {
                for (const item of from.items) {
                    if (stackItem === item) {
                        return from;
                    }
                }
                break;
            }
        }
        return null;
    }
}

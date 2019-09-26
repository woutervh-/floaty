import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactManagedDragable from 'react-managed-draggable';
import * as DropModel from './drop-model';
import { FloatingStartOptions, FloatyManager } from './floaty-manager';
import * as RenderersModel from './renderers-model';
import * as StateModel from './state-model';

interface Props<T> {
    state: StateModel.State<T>;
    onStateChange: (state: StateModel.State<T>) => void;
    renderers: RenderersModel.FloatyRenderers<T>;
}

interface State<T> {
    currentMousePosition: ReactManagedDragable.XY | null;
    dropResolutions: DropModel.DropResolution<T>[];
    rootDropArea: DropModel.DropArea | null;
}

export class Floaty<T> extends React.PureComponent<Props<T>, State<T>> implements FloatyManager<T> {
    public state: State<T> = {
        currentMousePosition: null,
        dropResolutions: [],
        rootDropArea: null
    };
    private portal = document.createElement('div');
    private dropResolutions: Map<unknown, DropModel.DropResolution<T>[]> = new Map();
    private eventTarget: HTMLElement | null = null;
    private raf: number | undefined = undefined;

    public componentDidMount() {
        this.updateDropAreas();
        if (this.props.state.floating) {
            this.registerFloatHandlers(document.body);
        }
        document.body.appendChild(this.portal);
    }

    public componentWillUnmount() {
        if (this.raf !== undefined) {
            window.cancelAnimationFrame(this.raf);
        }
        this.unregisterFloatHandlers();
        document.body.removeChild(this.portal);
    }

    public render() {
        return <React.Fragment>
            {this.renderLayout()}
            {this.renderFloating()}
        </React.Fragment>;
    }

    private renderLayout() {
        if (this.props.state.layout) {
            return <this.props.renderers.layoutRenderer
                floatyRenderers={this.props.renderers}
                floatyManager={this}
                layout={this.props.state.layout}
            />;
        } else {
            return <div style={{ width: '100%', height: '100%' }} />;
        }
    }

    private renderDropResolution() {
        if (!this.state.currentMousePosition) {
            return;
        }
        const resolution = this.getCandidateDropResolution(this.state.currentMousePosition);
        if (!resolution) {
            return;
        }
        if (resolution.type === 'container') {
            const side = Floaty.getContentResolutionSide(resolution, this.state.currentMousePosition);
            const sideDropArea: DropModel.DropArea = {
                left: side === 'right' ? resolution.dropArea.left + resolution.dropArea.width * 0.5 : resolution.dropArea.left,
                top: side === 'bottom' ? resolution.dropArea.top + resolution.dropArea.height * 0.5 : resolution.dropArea.top,
                width: side === 'left' || side === 'right' ? resolution.dropArea.width * 0.5 : resolution.dropArea.width,
                height: side === 'top' || side === 'bottom' ? resolution.dropArea.height * 0.5 : resolution.dropArea.height
            };
            return <this.props.renderers.dropAreaRenderer floatyManager={this} dropArea={sideDropArea} />;
        } else {
            return <this.props.renderers.dropAreaRenderer floatyManager={this} dropArea={resolution.dropArea} />;
        }
    }

    private renderFloating() {
        if (this.props.state.floating && this.state.currentMousePosition) {
            return ReactDOM.createPortal(
                <React.Fragment>
                    <div style={{ position: 'fixed', top: this.state.currentMousePosition.y, left: this.state.currentMousePosition.x }}>
                        <this.props.renderers.floatingRenderer
                            floatyRenderers={this.props.renderers}
                            floatyManager={this}
                            floating={this.props.state.floating}
                        />
                    </div>
                    {this.renderDropResolution()}
                </React.Fragment>,
                this.portal
            );
        }
    }

    private getCandidateDropResolution(position: ReactManagedDragable.XY): DropModel.DropResolution<T> | DropModel.DropResolutionRoot | null {
        if (this.props.state.floating) {
            for (const resolution of this.state.dropResolutions) {
                if (DropModel.pointInDropArea(resolution.dropArea, position)) {
                    return resolution;
                }
            }
            if (this.state.rootDropArea && DropModel.pointInDropArea(this.state.rootDropArea, position)) {
                return { type: 'root', dropArea: this.state.rootDropArea };
            }
        }
        return null;
    }

    private registerFloatHandlers(eventTarget: HTMLElement) {
        if (this.eventTarget) {
            return;
        }
        eventTarget.addEventListener('mousemove', this.handleMove, { passive: false });
        eventTarget.addEventListener('touchmove', this.handleMove, { passive: false });
        eventTarget.addEventListener('mouseup', this.handleUp, { passive: false });
        eventTarget.addEventListener('touchend', this.handleUp, { passive: false });
        this.eventTarget = eventTarget;
    }

    private unregisterFloatHandlers() {
        if (!this.eventTarget) {
            return;
        }
        this.eventTarget.removeEventListener('mousemove', this.handleMove);
        this.eventTarget.removeEventListener('touchmove', this.handleMove);
        this.eventTarget.removeEventListener('mouseup', this.handleUp);
        this.eventTarget.removeEventListener('touchend', this.handleUp);
        this.eventTarget = null;
    }

    private updateDropAreas = () => {
        const node = ReactDOM.findDOMNode(this);
        if (node instanceof Element) {
            const dropArea = DropModel.computeDropArea(node);
            if (!this.state.rootDropArea || !DropModel.dropAreasEqual(this.state.rootDropArea, dropArea)) {
                this.setState({ rootDropArea: dropArea });
            }
        }
        this.raf = window.requestAnimationFrame(this.updateDropAreas);
    }

    private updateState(state: StateModel.State<T>) {
        this.props.onStateChange({ ...state, layout: Floaty.minimizeLayout(state.layout) });
    }

    private onLayoutChange(layout: StateModel.Layout<T>) {
        const newState: StateModel.State<T> = {
            ...this.props.state,
            layout
        };
        this.updateState(newState);
    }

    private onRowOrColumnUpdateFractions = (rowOrColumn: StateModel.Column<T> | StateModel.Row<T>, index1: number, fraction1: number, index2: number, fraction2: number) => {
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

    public registerDropResolutions = (key: unknown, dropResolutions: DropModel.DropResolution<T>[]) => {
        this.dropResolutions.set(key, dropResolutions);
        this.updateDropResolutions();
    }

    public unregisterDropResolutions = (key: unknown) => {
        this.dropResolutions.delete(key);
        this.updateDropResolutions();
    }

    private updateDropResolutions() {
        const dropResolutions: DropModel.DropResolution<T>[] = [];
        for (const dropResolution of this.dropResolutions.values()) {
            dropResolutions.push(...dropResolution);
        }
        this.setState({ dropResolutions });
    }

    public onColumnUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onRowUpdateFractions = this.onRowOrColumnUpdateFractions;

    public onActivate = (stackItem: StateModel.StackItem<T>) => {
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.key} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const newStack: StateModel.Stack<T> = { ...stack, active: index };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    public onCloseTab = (stackItem: StateModel.StackItem<T>) => {
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.key} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const items = stack.items.slice();
        items.splice(index, 1);
        const newStack: StateModel.Stack<T> = { ...stack, items, active: Math.min(items.length - 1, stack.active) };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    public replaceItem = (stackItem: StateModel.StackItem<T>, item: T) => {
        const stack = this.findStack(stackItem);
        if (!stack) {
            throw new Error(`StackItem ${stackItem.key} not found.`);
        }
        const index = stack.items.indexOf(stackItem);
        const path = this.findPath(stack, this.props.state.layout);
        if (!path) {
            throw new Error('Stack not found.');
        }

        const newItems = stack.items.slice();
        newItems[index].item = item;
        const newStack: StateModel.Stack<T> = { ...stack, items: newItems };
        this.replaceInPath(newStack, path);
        this.onLayoutChange(path[path.length - 1]);
    }

    private handleMove = (event: MouseEvent | TouchEvent) => {
        if (this.props.state.floating) {
            event.preventDefault();
            const position = ReactManagedDragable.getPosition(event);
            this.setState({ currentMousePosition: position });
        }
    }

    private handleUp = (event: MouseEvent | TouchEvent) => {
        if (!this.props.state.floating) {
            return;
        }

        const position = event instanceof MouseEvent
            ? ReactManagedDragable.getPosition(event)
            : this.state.currentMousePosition;
        if (!position) {
            return;
        }

        const resolution = this.getCandidateDropResolution(position);
        if (!resolution) {
            return;
        }

        let path: StateModel.Layout<T>[] | null;
        if (resolution.type === 'root') {
            path = [{ type: 'stack', active: 0, items: [this.props.state.floating] }];
        } else {
            path = this.findPath(resolution.stack, this.props.state.layout);
            if (!path) {
                throw new Error('Stack not found.');
            }

            if (resolution.type === 'container') {
                const side = Floaty.getContentResolutionSide(resolution, position);
                const stackFloating: StateModel.Stack<T> = { type: 'stack', items: [this.props.state.floating], active: 0 };
                const childFloating: StateModel.ColumnOrRowItem<T> = { child: stackFloating, fraction: 0.5 };
                const childOriginal: StateModel.ColumnOrRowItem<T> = { child: resolution.stack, fraction: 0.5 };
                let newLayout: StateModel.Layout<T>;
                if (side === 'left') {
                    newLayout = { type: 'row', items: [childFloating, childOriginal] };
                } else if (side === 'right') {
                    newLayout = { type: 'row', items: [childOriginal, childFloating] };
                } else if (side === 'top') {
                    newLayout = { type: 'column', items: [childFloating, childOriginal] };
                } else {
                    newLayout = { type: 'column', items: [childOriginal, childFloating] };
                }
                this.replaceInPath(newLayout, path);
            } else {
                const items = resolution.stack.items.slice();
                items.splice(resolution.index, 0, this.props.state.floating);
                const newStack: StateModel.Stack<T> = { ...resolution.stack, items, active: resolution.index };
                this.replaceInPath(newStack, path);
            }
        }

        const newState: StateModel.State<T> = {
            layout: path[path.length - 1],
            floating: null
        };
        this.updateState(newState);
        this.unregisterFloatHandlers();
    }

    public onStartFloat = (stackItem: StateModel.StackItem<T>, options: FloatingStartOptions) => {
        if (this.props.state.floating) {
            return;
        }
        const stack = this.findStack(stackItem);

        let newState: StateModel.State<T>;
        if (stack) {
            const index = stack.items.indexOf(stackItem);
            const path = this.findPath(stack, this.props.state.layout);
            if (!path) {
                throw new Error('Stack not found.');
            }

            const items = stack.items.slice();
            items.splice(index, 1);
            const newStack: StateModel.Stack<T> = { ...stack, items, active: Math.min(items.length - 1, stack.active) };
            this.replaceInPath(newStack, path);

            newState = {
                layout: path[path.length - 1],
                floating: stack.items[index]
            };
        } else {
            newState = {
                layout: this.props.state.layout,
                floating: stackItem
            };
        }

        // Update floating position.
        if ('initialPosition' in options) {
            this.setState({ currentMousePosition: options.initialPosition });
        } else {
            this.setState({ currentMousePosition: ReactManagedDragable.getPosition(options.event) });
        }

        // Update controlled state.
        this.updateState(newState);

        if ('eventTarget' in options) {
            this.registerFloatHandlers(options.eventTarget);
        } else if ('event' in options) {
            if (options.event instanceof TouchEvent && options.event.target && options.event.target instanceof HTMLElement) {
                // Touch events should be re-registered with their event target, otherwise the touchmove and touchup events will not fire.
                this.registerFloatHandlers(options.event.target);
            } else {
                // Mouse events can happily be attached to the body.
                this.registerFloatHandlers(document.body);
            }
        } else {
            this.registerFloatHandlers(document.body);
        }
    }

    public getLayout = () => {
        return this.props.state.layout;
    }

    public findStack = (stackItem: StateModel.StackItem<T>): StateModel.Stack<T> | null => {
        return Floaty.findStack(stackItem, this.getLayout());
    }

    private replaceInPath(target: StateModel.Layout<T>, path: StateModel.Layout<T>[]) {
        let previous = path[0];
        path[0] = target;
        for (let i = 1; i < path.length; i++) {
            // The first item of the path can be a Stack, but the rest are always Columns and Rows.
            const node = path[i] as StateModel.Column<T> | StateModel.Row<T>;
            const index = node.items.findIndex((item) => item.child === previous);
            const items = node.items.slice();
            items[index] = { ...items[index], child: path[i - 1] };
            previous = path[i];
            path[i] = { ...node, items };
        }
    }

    private findPath(target: StateModel.Layout<T>, from: StateModel.Layout<T> | null): StateModel.Layout<T>[] | null {
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

    public static minimizeLayout<T>(layout: StateModel.Layout<T> | null): StateModel.Layout<T> | null {
        if (layout === null) {
            return null;
        }
        switch (layout.type) {
            case 'column':
            case 'row': {
                const type = layout.type;
                const items: StateModel.ColumnOrRowItem<T>[] = [];
                let changed = false;
                for (const item of layout.items) {
                    const result = this.minimizeLayout(item.child);
                    if (result !== item.child) {
                        changed = true;
                    }
                    if (result) {
                        if (result.type === type) {
                            const childSumFractions = result.items.map((item) => item.fraction).reduce((sum, fraction) => sum + fraction);
                            const normalizedChildFractions = result.items.map((item) => item.fraction / childSumFractions);
                            for (let i = 0; i < result.items.length; i++) {
                                items.push({ ...result.items[i], fraction: normalizedChildFractions[i] * item.fraction });
                            }
                            changed = true;
                        } else {
                            items.push({ ...item, child: result });
                        }
                    }
                }
                if (items.length >= 2) {
                    if (changed) {
                        // Normalize fractions.
                        const fractionSum = items.reduce((sum, item) => sum + item.fraction, 0);
                        const normalizedItems = items.map((item) => {
                            return {
                                ...item,
                                fraction: item.fraction / fractionSum
                            };
                        });
                        return { ...layout, items: normalizedItems };
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

    private static findStack<T>(stackItem: StateModel.StackItem<T>, from: StateModel.Layout<T> | null): StateModel.Stack<T> | null {
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

    private static getContentResolutionSide(resolution: DropModel.DropResolutionContainer<unknown>, mousePosition: ReactManagedDragable.XY): 'left' | 'right' | 'top' | 'bottom' {
        if (mousePosition.x <= resolution.dropArea.left + resolution.dropArea.width * 0.2) {
            return 'left';
        } else if (mousePosition.x >= resolution.dropArea.left + resolution.dropArea.width * 0.8) {
            return 'right';
        } else if (mousePosition.y <= resolution.dropArea.top + resolution.dropArea.height * 0.5) {
            return 'top';
        } else {
            return 'bottom';
        }
    }
}

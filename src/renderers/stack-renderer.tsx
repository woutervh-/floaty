import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as DropModel from '../drop-model';
import * as RenderersModel from '../renderers-model';

export class StackRenderer<T> extends React.PureComponent<RenderersModel.StackRendererProps<T>, never> {
    private raf: number | undefined = undefined;
    private tabRefs: Map<string, HTMLDivElement> = new Map();
    private tabFillerRef: HTMLDivElement | null = null;
    private containerRef: Element | null = null;
    private tabDropAreas: Map<string, DropModel.DropArea> = new Map();
    private tabFillerDropArea: DropModel.DropArea | null = null;
    private containerDropArea: DropModel.DropArea | null = null;

    public componentDidMount() {
        const container = ReactDOM.findDOMNode(this);
        if (container instanceof Element) {
            this.containerRef = container;
        }
        this.updateDropAreas();
    }

    public componentWillUnmount() {
        if (this.raf !== undefined) {
            window.cancelAnimationFrame(this.raf);
        }
        this.props.floatyManager.unregisterDropResolutions(this);
        this.containerRef = null;
    }

    private handleTabFillerRef = (element: HTMLDivElement | null) => {
        this.tabFillerRef = element;
    }

    private handleTabRef = (identifier: string) => (element: HTMLDivElement | null) => {
        if (element) {
            this.tabRefs.set(identifier, element);
        } else {
            this.tabRefs.delete(identifier);
        }
    }

    private updateDropAreas = () => {
        const dropResolutions: DropModel.DropResolution<T>[] = [];
        let changed = false;

        for (let i = 0; i < this.props.stack.items.length; i++) {
            const stackItem = this.props.stack.items[i];

            if (!this.tabRefs.has(stackItem.key)) {
                continue;
            }

            const newDropArea = DropModel.computeDropArea(this.tabRefs.get(stackItem.key)!);

            dropResolutions.push({
                type: 'tab',
                dropArea: newDropArea,
                stack: this.props.stack,
                index: i
            });

            if (!this.tabDropAreas.has(stackItem.key) || !DropModel.dropAreasEqual(this.tabDropAreas.get(stackItem.key)!, newDropArea)) {
                changed = true;
                this.tabDropAreas.set(stackItem.key, newDropArea);
            }
        }

        if (this.tabFillerRef !== null) {
            const newDropArea = DropModel.computeDropArea(this.tabFillerRef);
            dropResolutions.push({
                type: 'tab',
                dropArea: newDropArea,
                stack: this.props.stack,
                index: this.props.stack.items.length
            });
            if (this.tabFillerDropArea === null || !DropModel.dropAreasEqual(this.tabFillerDropArea, newDropArea)) {
                changed = true;
                this.tabFillerDropArea = newDropArea;
            }
        }

        if (this.containerRef !== null) {
            const newDropArea = DropModel.computeDropArea(this.containerRef);
            dropResolutions.push({
                type: 'container',
                dropArea: newDropArea,
                stack: this.props.stack
            });
            if (this.containerDropArea === null || !DropModel.dropAreasEqual(this.containerDropArea, newDropArea)) {
                changed = true;
                this.containerDropArea = newDropArea;
            }
        }

        if (changed) {
            this.props.floatyManager.registerDropResolutions(this, dropResolutions);
        }

        this.raf = window.requestAnimationFrame(this.updateDropAreas);
    }

    public render() {
        return <this.props.floatyRenderers.stackContainerRenderer floatyManager={this.props.floatyManager} stack={this.props.stack}>
            <this.props.floatyRenderers.stackTabsRenderer floatyManager={this.props.floatyManager} stack={this.props.stack}>
                {this.props.stack.items.map((stackItem, index) => {
                    return <div
                        key={stackItem.key}
                        ref={this.handleTabRef(stackItem.key)}
                    >
                        <this.props.floatyRenderers.tabRenderer
                            floatyManager={this.props.floatyManager}
                            stack={this.props.stack}
                            stackItemIndex={index}
                            stackItem={stackItem}
                        />
                    </div>;
                })}
                <div ref={this.handleTabFillerRef}>
                    <this.props.floatyRenderers.tabFillerRenderer floatyManager={this.props.floatyManager} stack={this.props.stack} />
                </div>
            </this.props.floatyRenderers.stackTabsRenderer>
            <this.props.floatyRenderers.contentRenderer
                key={this.props.stack.items[this.props.stack.active].key}
                floatyManager={this.props.floatyManager}
                stack={this.props.stack}
                stackIndex={this.props.stack.active}
                stackItem={this.props.stack.items[this.props.stack.active]}
            />
        </this.props.floatyRenderers.stackContainerRenderer>;
    }
}

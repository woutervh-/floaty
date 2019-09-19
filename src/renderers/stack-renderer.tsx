import * as React from 'react';
import * as DropModel from '../drop-model';
import * as RenderersModel from '../renderers-model';

export class StackRenderer extends React.PureComponent<RenderersModel.StackRendererProps, never> {
    private raf: number | undefined = undefined;
    private tabRefs: Map<string, HTMLDivElement> = new Map();
    private tabFillerRef: HTMLDivElement | null = null;
    private containerRef: HTMLDivElement | null = null;
    private tabDropAreas: Map<string, DropModel.DropArea> = new Map();
    private tabFillerDropArea: DropModel.DropArea | null = null;
    private containerDropArea: DropModel.DropArea | null = null;

    public componentDidMount() {
        this.updateDropAreas();
    }

    public componentWillUnmount() {
        if (this.raf !== undefined) {
            window.cancelAnimationFrame(this.raf);
        }
        this.props.floatyManager.unregisterDropResolutions(this);
    }

    private handleTabFillerRef = (element: HTMLDivElement | null) => {
        this.tabFillerRef = element;
    }

    private handleContainerRef = (element: HTMLDivElement | null) => {
        this.containerRef = element;
    }

    private handleTabRef = (identifier: string) => (element: HTMLDivElement | null) => {
        if (element) {
            this.tabRefs.set(identifier, element);
        } else {
            this.tabRefs.delete(identifier);
        }
    }

    private computeDropArea(element: HTMLDivElement): DropModel.DropArea {
        const clientRect = element.getBoundingClientRect();
        return {
            top: clientRect.top,
            left: clientRect.left,
            width: clientRect.width,
            height: clientRect.height
        };
    }

    private dropAreasEqual(dropAreaA: DropModel.DropArea, dropAreaB: DropModel.DropArea) {
        return dropAreaA.top === dropAreaB.top
            && dropAreaA.left === dropAreaB.left
            && dropAreaA.width === dropAreaB.width
            && dropAreaA.height === dropAreaB.height;
    }

    private updateDropAreas = () => {
        const dropResolutions: DropModel.DropResolution[] = [];
        let changed = false;

        for (let i = 0; i < this.props.stack.items.length; i++) {
            const stackItem = this.props.stack.items[i];

            if (!this.tabRefs.has(stackItem.identifier)) {
                continue;
            }

            const newDropArea = this.computeDropArea(this.tabRefs.get(stackItem.identifier)!);

            dropResolutions.push({
                type: 'tab',
                dropArea: newDropArea,
                stack: this.props.stack,
                index: i
            });

            if (!this.tabDropAreas.has(stackItem.identifier) || !this.dropAreasEqual(this.tabDropAreas.get(stackItem.identifier)!, newDropArea)) {
                changed = true;
            }
        }

        if (this.tabFillerRef !== null) {
            const newDropArea = this.computeDropArea(this.tabFillerRef);
            dropResolutions.push({
                type: 'tab',
                dropArea: newDropArea,
                stack: this.props.stack,
                index: this.props.stack.items.length
            });
            if (this.tabFillerDropArea === null || !this.dropAreasEqual(this.tabFillerDropArea, newDropArea)) {
                changed = true;
            }
        }

        if (this.containerRef !== null) {
            const newDropArea = this.computeDropArea(this.containerRef);
            dropResolutions.push({
                type: 'container',
                dropArea: newDropArea,
                stack: this.props.stack
            });
            if (this.containerDropArea === null || !this.dropAreasEqual(this.containerDropArea, newDropArea)) {
                changed = true;
            }
        }

        if (changed) {
            this.props.floatyManager.registerDropResolutions(this, dropResolutions);
        }

        this.raf = window.requestAnimationFrame(this.updateDropAreas);
    }

    public render() {
        return <div
            ref={this.handleContainerRef}
            style={{
                display: 'grid',
                gridTemplateRows: 'max-content 1fr',
                width: '100%',
                height: '100%'
            }}
        >
            <this.props.floatyRenderers.stackTabsRenderer floatyManager={this.props.floatyManager} floatyRenderers={this.props.floatyRenderers} stack={this.props.stack}>
                {this.props.stack.items.map((stackItem, index) => {
                    return <div
                        key={stackItem.identifier}
                        ref={this.handleTabRef(stackItem.identifier)}
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
                key={this.props.stack.items[this.props.stack.active].identifier}
                floatyManager={this.props.floatyManager}
                stack={this.props.stack}
                stackIndex={this.props.stack.active}
                stackItem={this.props.stack.items[this.props.stack.active]}
            />
        </div>;

        return <div
            ref={this.handleContainerRef}
            style={{
                display: 'grid',
                gridTemplateColumns: `${this.props.stack.items.map(() => 'minmax(min-content, max-content)').join(' ')} 1fr`,
                gridTemplateRows: 'max-content 1fr',
                width: '100%',
                height: '100%'
            }}
        >
            {this.props.stack.items.map((stackItem, index) => {
                return <div
                    key={stackItem.identifier}
                    ref={this.handleTabRef(stackItem.identifier)}
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
            <div style={{ gridColumn: `1 / span ${this.props.stack.items.length + 1}` }}>
                <this.props.floatyRenderers.contentRenderer
                    key={this.props.stack.items[this.props.stack.active].identifier}
                    floatyManager={this.props.floatyManager}
                    stack={this.props.stack}
                    stackIndex={this.props.stack.active}
                    stackItem={this.props.stack.items[this.props.stack.active]}
                />
            </div>
        </div>;
    }
}

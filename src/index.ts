export { Floaty } from './floaty';
export * from './state-model';
export * from './floaty-manager';
export * from './renderers-model';
export * from './drop-model';
export * from './static-utilities';
import * as Renderers from './renderers';

export { Renderers };

export const defaultRenderers = {
    columnRenderer: Renderers.ColumnRenderer,
    columnSeparatorHandleRenderer: Renderers.ColumnSeparatorHandleRenderer,
    columnSeparatorRenderer: Renderers.ColumnSeparatorRenderer,
    dropAreaRenderer: Renderers.DropAreaRenderer,
    floatingRenderer: Renderers.FloatingRenderer,
    layoutRenderer: Renderers.LayoutRenderer,
    rowRenderer: Renderers.RowRenderer,
    rowSeparatorHandleRenderer: Renderers.RowSeparatorHandleRenderer,
    rowSeparatorRenderer: Renderers.RowSeparatorRenderer,
    stackContainerRenderer: Renderers.StackContainerRenderer,
    stackRenderer: Renderers.StackRenderer,
    stackTabsRenderer: Renderers.StackTabsRenderer,
    tabFillerRenderer: Renderers.TabFillerRenderer
};

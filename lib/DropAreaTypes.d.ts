export interface IDropAreaResolution {
    x: number;
    y: number;
    width: number;
    height: number;
    resolved: boolean;
    execute?: (item: string, title: any) => void;
}
export interface IResolvableDropArea {
    resolveDropArea: (position: {
        x: number;
        y: number;
    }) => IDropAreaResolution;
}

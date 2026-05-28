export type HotMiddlewareMessage = {
    action: 'building';
    name?: string;
} | {
    action: 'built' | 'sync';
    name: string;
    time: number | undefined;
    errors: unknown[];
    warnings: unknown[];
    hash: string | undefined;
    modules: {
        [key: string]: string;
    };
};
export declare const hotMiddlewareOptions: {
    path: string;
    timeout: number;
    reload: boolean;
    warn: boolean;
    heartbeat: number;
};
export type HotMiddlewareOptions = typeof hotMiddlewareOptions;
export type ModuleMap = {
    [key: string]: string;
};

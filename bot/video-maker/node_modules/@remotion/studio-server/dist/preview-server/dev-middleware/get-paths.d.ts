import type { DevMiddlewareContext } from './types';
type PublicPath = {
    outputPath: string;
    publicPath: string;
};
export declare function getPaths(context: DevMiddlewareContext): PublicPath[];
export {};

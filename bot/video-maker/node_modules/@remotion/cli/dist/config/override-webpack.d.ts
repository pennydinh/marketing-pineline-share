import type { WebpackConfiguration } from '@remotion/bundler';
export type WebpackOverrideFn = (currentConfiguration: WebpackConfiguration) => WebpackConfiguration | Promise<WebpackConfiguration>;
export declare const defaultOverrideFunction: WebpackOverrideFn;
export declare const getWebpackOverrideFn: () => WebpackOverrideFn;
export declare const overrideWebpackConfig: (fn: WebpackOverrideFn) => void;

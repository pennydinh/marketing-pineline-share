/**
 * Source code is adapted from
 * https://github.com/webpack-contrib/webpack-hot-middleware#readme
 * and rewritten in TypeScript. This file is MIT licensed
 */
/**
 * Based heavily on https://github.com/webpack/webpack/blob/
 *  c0afdf9c6abc1dd70707c594e473802a566f7b6e/hot/only-dev-server.js
 * Original copyright Tobias Koppers @sokra (MIT license)
 */
import type { HotMiddlewareOptions, ModuleMap } from '@remotion/studio-shared';
export declare const processUpdate: (hash: string | undefined, moduleMap: ModuleMap, options: HotMiddlewareOptions) => void;

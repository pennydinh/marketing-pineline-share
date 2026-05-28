import type { webpack } from '@remotion/bundler';
import type { DevMiddlewareContext } from './types';
export declare function ready(context: DevMiddlewareContext, callback: (stats: webpack.Stats | undefined) => undefined | Promise<void>): void;

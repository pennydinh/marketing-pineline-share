import type { webpack } from '@remotion/bundler';
import type { LogLevel } from '@remotion/renderer';
import type { MiddleWare } from './middleware';
export declare const wdm: (compiler: webpack.Compiler, logLevel: LogLevel) => MiddleWare;

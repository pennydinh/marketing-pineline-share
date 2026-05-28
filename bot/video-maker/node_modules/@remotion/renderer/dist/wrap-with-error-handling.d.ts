import type { LogLevel } from './log-level';
type AsyncFunction<A extends unknown[], R> = (...args: A) => Promise<R>;
type LogLevelAndIndentApi = {
    logLevel: LogLevel;
    indent: boolean;
};
export declare const wrapWithErrorHandling: <A extends [LogLevelAndIndentApi, ...unknown[]], R>(fn: AsyncFunction<A, R>) => AsyncFunction<A, R>;
export {};

import type { LogLevel } from './log-level';
export declare const shouldUseParallelEncoding: ({ width, height, logLevel, }: {
    width: number;
    height: number;
    logLevel: LogLevel;
}) => {
    hasEnoughMemory: boolean;
    freeMemory: number;
    estimatedUsage: number;
};

import type { getCompositions, LogLevel } from '@remotion/renderer';
type Await<T> = T extends PromiseLike<infer U> ? U : T;
export declare const showSingleCompositionsPicker: (validCompositions: Await<ReturnType<typeof getCompositions>>, logLevel: LogLevel) => Promise<{
    compositionId: string;
    reason: string;
}>;
export declare const showMultiCompositionsPicker: (validCompositions: Await<ReturnType<typeof getCompositions>>, logLevel: LogLevel) => Promise<string[]>;
export {};

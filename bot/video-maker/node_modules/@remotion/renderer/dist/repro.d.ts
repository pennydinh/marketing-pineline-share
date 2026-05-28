import type { LogLevel } from './log-level';
type ReproWriter = {
    start: (options: {
        serveUrl: string;
        serializedInputPropsWithCustomSchema: string;
        serializedResolvedPropsWithCustomSchema: string;
    }) => void;
    writeLine: (level: string, ...args: Parameters<typeof console.log>[]) => void;
    onRenderSucceed: (options: {
        output: string | null;
        logLevel: LogLevel;
        indent: boolean;
    }) => Promise<void>;
};
export declare const getReproWriter: () => ReproWriter;
export declare const writeInRepro: (level: string, message?: any, ...optionalParams: any[]) => void;
export declare const enableRepro: ({ serveUrl, compositionName, serializedInputPropsWithCustomSchema, serializedResolvedPropsWithCustomSchema, }: {
    serveUrl: string;
    compositionName: string;
    serializedInputPropsWithCustomSchema: string;
    serializedResolvedPropsWithCustomSchema: string;
}) => void;
export declare const disableRepro: () => void;
export declare const isReproEnabled: () => boolean;
export {};

import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
export declare const createSilentAudio: ({ outName, indent, logLevel, binariesDirectory, cancelSignal, chunkLengthInSeconds, }: {
    chunkLengthInSeconds: number;
    outName: string;
    indent: boolean;
    logLevel: LogLevel;
    binariesDirectory: string | null;
    cancelSignal: CancelSignal | undefined;
}) => Promise<void>;

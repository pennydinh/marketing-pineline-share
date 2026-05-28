import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
export declare const guessExtensionForVideo: ({ src, indent, logLevel, binariesDirectory, cancelSignal, }: {
    src: string;
    indent: boolean;
    logLevel: LogLevel;
    binariesDirectory: string | null;
    cancelSignal: CancelSignal | undefined;
}) => Promise<"mp3" | "wav" | "mp4" | "webm">;

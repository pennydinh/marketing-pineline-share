import type { Codec } from './codec';
import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
export declare const combineVideoStreams: ({ fps, codec, filelistDir, numberOfGifLoops, output, indent, logLevel, onProgress, files, addRemotionMetadata, binariesDirectory, cancelSignal, }: {
    fps: number;
    codec: Codec;
    filelistDir: string;
    numberOfGifLoops: number | null;
    output: string;
    indent: boolean;
    logLevel: LogLevel;
    onProgress: (p: number) => void;
    files: string[];
    addRemotionMetadata: boolean;
    binariesDirectory: string | null;
    cancelSignal: CancelSignal | undefined;
}) => Promise<string>;

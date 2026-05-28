import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
import type { AudioCodec } from './options/audio-codec';
export declare const compressAudio: ({ audioCodec, outName, binariesDirectory, indent, logLevel, audioBitrate, cancelSignal, inName, onProgress, chunkLengthInSeconds, fps, }: {
    audioCodec: AudioCodec;
    outName: string;
    indent: boolean;
    logLevel: LogLevel;
    binariesDirectory: string | null;
    audioBitrate: string | null;
    cancelSignal: CancelSignal | undefined;
    inName: string;
    onProgress: (progress: number) => void;
    chunkLengthInSeconds: number;
    fps: number;
}) => Promise<void>;

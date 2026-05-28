import type { DownloadMap } from './assets/download-map';
import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
import type { PreprocessedAudioTrack } from './preprocess-audio-track';
type Options = {
    files: PreprocessedAudioTrack[];
    outName: string;
    downloadMap: DownloadMap;
    remotionRoot: string;
    indent: boolean;
    logLevel: LogLevel;
    binariesDirectory: string | null;
    cancelSignal: CancelSignal | undefined;
    onProgress: (progress: number) => void;
    fps: number;
    chunkLengthInSeconds: number;
};
export declare const mergeAudioTrack: (options: Options) => Promise<void>;
export {};

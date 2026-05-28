import type { RenderMediaOnDownload } from './assets/download-and-map-assets-to-file';
import type { DownloadMap } from './assets/download-map';
import type { LogLevel } from './log-level';
import type { CancelSignal } from './make-cancel-signal';
import type { AudioCodec } from './options/audio-codec';
import type { FrameAndAssets } from './render-frames';
export type SeamlessAudioInfo = {
    chunkLengthInSeconds: number;
    trimLeftOffset: number;
    trimRightOffset: number;
};
export declare const createAudio: ({ assets, onDownload, fps, logLevel, onProgress, downloadMap, remotionRoot, indent, binariesDirectory, audioBitrate, audioCodec, cancelSignal, chunkLengthInSeconds, trimLeftOffset, trimRightOffset, forSeamlessAacConcatenation, }: {
    assets: FrameAndAssets[];
    onDownload: RenderMediaOnDownload | undefined;
    fps: number;
    logLevel: LogLevel;
    onProgress: (progress: number) => void;
    downloadMap: DownloadMap;
    remotionRoot: string;
    indent: boolean;
    binariesDirectory: string | null;
    audioBitrate: string | null;
    audioCodec: AudioCodec;
    cancelSignal: CancelSignal | undefined;
    chunkLengthInSeconds: number;
    trimLeftOffset: number;
    trimRightOffset: number;
    forSeamlessAacConcatenation: boolean;
}) => Promise<string>;

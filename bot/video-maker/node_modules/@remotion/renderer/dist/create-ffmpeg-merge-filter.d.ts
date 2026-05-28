import type { PreprocessedAudioTrack } from './preprocess-audio-track';
export declare const OUTPUT_FILTER_NAME = "outputaudio";
export declare const createFfmpegMergeFilter: ({ inputs, }: {
    inputs: PreprocessedAudioTrack[];
}) => string;

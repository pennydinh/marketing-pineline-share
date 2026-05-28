import type { TSequence } from 'remotion';
type Track = {
    sequence: TSequence;
    depth: number;
};
export type TrackWithHash = Track & {
    hash: string;
};
export type TrackWithHashAndOriginalTimings = TrackWithHash & {
    hash: string;
    cascadedStart: number;
    cascadedDuration: number;
};
export declare const getTimelineSequenceSequenceSortKey: (track: TrackWithHash, tracks: TrackWithHash[], sameHashes?: {
    [hash: string]: string[];
}) => string;
export {};

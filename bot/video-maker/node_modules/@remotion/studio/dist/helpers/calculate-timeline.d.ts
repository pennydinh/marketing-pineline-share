import type { TSequence } from 'remotion';
import type { TrackWithHash } from './get-timeline-sequence-sort-key';
export declare const calculateTimeline: ({ sequences, sequenceDuration, }: {
    sequences: TSequence[];
    sequenceDuration: number;
}) => TrackWithHash[];

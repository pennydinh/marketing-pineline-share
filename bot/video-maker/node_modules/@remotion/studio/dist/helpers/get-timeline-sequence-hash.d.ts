import type { TSequence } from 'remotion';
export declare const getTimelineSequenceHash: (sequence: TSequence, allSequences: TSequence[], hashesUsedInRoot: {
    [rootId: string]: string[];
}, cache: {
    [sequenceId: string]: string;
}) => string;

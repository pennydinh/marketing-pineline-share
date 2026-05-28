"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineSequenceSequenceSortKey = void 0;
const getTimelineSequenceSequenceSortKey = (track, tracks, sameHashes = {}) => {
    const firstSequenceWithSameHash = tracks.find((t) => sameHashes[track.hash].includes(t.sequence.id));
    const id = String(firstSequenceWithSameHash.sequence.nonce).padStart(6, '0');
    if (!track.sequence.parent) {
        return id;
    }
    const parent = tracks.find((t) => t.sequence.id === track.sequence.parent);
    if (!parent) {
        // Due to effects and conditional `showInTimeline`, a parent
        // may not exist in the `allTracks` array.
        return id;
    }
    const firstParentWithSameHash = tracks.find((a) => {
        return sameHashes[parent.hash].includes(a.sequence.id);
    });
    if (!firstParentWithSameHash) {
        throw new Error('could not find parent: ' + track.sequence.parent);
    }
    return `${(0, exports.getTimelineSequenceSequenceSortKey)(firstParentWithSameHash, tracks, sameHashes)}-${id}`;
};
exports.getTimelineSequenceSequenceSortKey = getTimelineSequenceSequenceSortKey;

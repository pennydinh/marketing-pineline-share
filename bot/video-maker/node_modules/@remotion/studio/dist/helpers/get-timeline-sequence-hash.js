"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineSequenceHash = void 0;
// The goal for this function is to calculate an as unique as possible identifier
// for a sequence based on it's properties. A sequence can be registered multiple times
// from main preview and from thumbnails and we use this to deduplicate it.
// This is why we don't use `id` properties as they will
// differ as a hash.
const getTimelineSequenceHash = (sequence, allSequences, hashesUsedInRoot, cache) => {
    if (cache[sequence.id]) {
        return cache[sequence.id];
    }
    const parent = allSequences.find((a) => a.id === sequence.parent);
    const baseHash = [
        parent
            ? (0, exports.getTimelineSequenceHash)(parent, allSequences, hashesUsedInRoot, cache)
            : null,
        sequence.displayName,
        sequence.duration,
        sequence.from,
        sequence.type,
        sequence.type === 'audio' ? sequence.src : null,
        sequence.type === 'audio' ? sequence.volume : null,
        sequence.type === 'video' ? sequence.src : null,
        sequence.type === 'video' ? sequence.volume : null,
    ].join('-');
    const actualHash = baseHash +
        hashesUsedInRoot[sequence.rootId].filter((h) => h === baseHash).length;
    hashesUsedInRoot[sequence.rootId].push(baseHash);
    cache[sequence.id] = actualHash;
    return actualHash;
};
exports.getTimelineSequenceHash = getTimelineSequenceHash;

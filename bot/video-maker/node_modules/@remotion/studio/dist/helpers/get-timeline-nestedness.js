"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineNestedLevel = void 0;
const getTimelineNestedLevel = (sequence, allSequences, depth) => {
    if (!sequence.parent) {
        return depth;
    }
    const parentSequence = allSequences.find((s) => s.id === sequence.parent);
    if (!parentSequence) {
        throw new Error('has parentId but no parent');
    }
    return (0, exports.getTimelineNestedLevel)(parentSequence, allSequences, depth + 1);
};
exports.getTimelineNestedLevel = getTimelineNestedLevel;

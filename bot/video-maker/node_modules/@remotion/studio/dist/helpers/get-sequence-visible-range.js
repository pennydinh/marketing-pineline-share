"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimelineVisibleDuration = exports.getTimelineVisibleStart = exports.getCascadedStart = void 0;
const getCascadedStart = (sequence, sequences) => {
    if (!sequence.parent) {
        return sequence.from;
    }
    const parent = sequences.find((s) => s.id === sequence.parent);
    if (!parent) {
        throw new TypeError('Parent not found for sequence ' + sequence.id);
    }
    return (0, exports.getCascadedStart)(parent, sequences) + sequence.from;
};
exports.getCascadedStart = getCascadedStart;
const getTimelineVisibleStart = (sequence, sequences) => {
    const cascadedStart = Math.max(0, (0, exports.getCascadedStart)(sequence, sequences));
    if (!sequence.parent) {
        return cascadedStart;
    }
    const parent = sequences.find((s) => s.id === sequence.parent);
    if (!parent) {
        throw new TypeError('Parent not found for sequence ' + sequence.id);
    }
    const timelineVisibleStart = (0, exports.getTimelineVisibleStart)(parent, sequences);
    return Math.max(timelineVisibleStart, cascadedStart);
};
exports.getTimelineVisibleStart = getTimelineVisibleStart;
const getTimelineVisibleDuration = (sequence, sequences) => {
    const visibleDuration = sequence.duration + Math.min(sequence.from, 0);
    if (!sequence.parent) {
        return visibleDuration;
    }
    const parent = sequences.find((s) => s.id === sequence.parent);
    if (!parent) {
        throw new TypeError('Parent not found for sequence ' + sequence.id);
    }
    return Math.min(visibleDuration, (0, exports.getTimelineVisibleDuration)(parent, sequences));
};
exports.getTimelineVisibleDuration = getTimelineVisibleDuration;

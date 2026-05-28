"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTrackHidden = void 0;
const isTrackHidden = (track) => {
    if (!track.sequence.parent) {
        return false;
    }
    return !track.sequence.showInTimeline;
};
exports.isTrackHidden = isTrackHidden;

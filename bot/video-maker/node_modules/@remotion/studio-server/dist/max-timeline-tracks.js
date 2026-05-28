"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMaxTimelineTracks = exports.setMaxTimelineTracks = void 0;
const studio_shared_1 = require("@remotion/studio-shared");
let maxTimelineTracks = studio_shared_1.DEFAULT_TIMELINE_TRACKS;
const setMaxTimelineTracks = (maxTracks) => {
    if (typeof maxTracks !== 'number') {
        throw new Error(`Need to pass a number to Config.setMaxTimelineTracks(), got ${typeof maxTracks}`);
    }
    if (Number.isNaN(maxTracks)) {
        throw new Error(`Need to pass a real number to Config.setMaxTimelineTracks(), got NaN`);
    }
    if (!Number.isFinite(maxTracks)) {
        throw new Error(`Need to pass a real number to Config.setMaxTimelineTracks(), got ${maxTracks}`);
    }
    if (maxTracks < 0) {
        throw new Error(`Need to pass a non-negative number to Config.setMaxTimelineTracks(), got ${maxTracks}`);
    }
    maxTimelineTracks = maxTracks;
};
exports.setMaxTimelineTracks = setMaxTimelineTracks;
const getMaxTimelineTracks = () => {
    return maxTimelineTracks;
};
exports.getMaxTimelineTracks = getMaxTimelineTracks;

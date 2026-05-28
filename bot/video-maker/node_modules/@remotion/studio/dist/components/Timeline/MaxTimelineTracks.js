"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxTimelineTracksReached = exports.MAX_TIMELINE_TRACKS_NOTICE_HEIGHT = exports.MAX_TIMELINE_TRACKS = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const studio_shared_1 = require("@remotion/studio-shared");
const timeline_layout_1 = require("../../helpers/timeline-layout");
exports.MAX_TIMELINE_TRACKS = typeof process.env.MAX_TIMELINE_TRACKS === 'undefined' ||
    process.env.MAX_TIMELINE_TRACKS === null
    ? studio_shared_1.DEFAULT_TIMELINE_TRACKS
    : Number(process.env.MAX_TIMELINE_TRACKS);
exports.MAX_TIMELINE_TRACKS_NOTICE_HEIGHT = 24;
const container = {
    height: exports.MAX_TIMELINE_TRACKS_NOTICE_HEIGHT,
    display: 'flex',
    alignItems: 'center',
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'sans-serif',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: timeline_layout_1.TIMELINE_PADDING + 5,
};
const MaxTimelineTracksReached = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: ["Limited display to ", exports.MAX_TIMELINE_TRACKS, " tracks to sustain performance.", '', "You can change this by setting Config.setMaxTimelineTracks() in your remotion.config.ts file."] }));
};
exports.MaxTimelineTracksReached = MaxTimelineTracksReached;

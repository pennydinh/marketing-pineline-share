"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentComposition = exports.CURRENT_COMPOSITION_HEIGHT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const remotion_1 = require("remotion");
const colors_1 = require("../helpers/colors");
const is_composition_still_1 = require("../helpers/is-composition-still");
const render_frame_1 = require("../state/render-frame");
exports.CURRENT_COMPOSITION_HEIGHT = 80;
const container = {
    height: exports.CURRENT_COMPOSITION_HEIGHT,
    display: 'block',
    borderBottom: `1px solid ${colors_1.BORDER_COLOR}`,
    padding: 12,
    color: 'white',
    backgroundColor: colors_1.BACKGROUND,
};
const title = {
    fontWeight: 'bold',
    fontSize: 12,
    whiteSpace: 'nowrap',
    lineHeight: '18px',
    backgroundColor: colors_1.BACKGROUND,
};
const subtitle = {
    fontSize: 12,
    opacity: 0.8,
    whiteSpace: 'nowrap',
    lineHeight: '18px',
    backgroundColor: colors_1.BACKGROUND,
};
const row = {
    display: 'flex',
    flexDirection: 'row',
    lineHeight: '18px',
    backgroundColor: colors_1.BACKGROUND,
};
const CurrentComposition = () => {
    const video = remotion_1.Internals.useVideo();
    if (!video) {
        return (0, jsx_runtime_1.jsx)("div", { style: container });
    }
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsx)("div", { style: row, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("div", { style: title, children: video.id }), (0, jsx_runtime_1.jsxs)("div", { style: subtitle, children: [video.width, "x", video.height, (0, is_composition_still_1.isCompositionStill)(video) ? null : `, ${video.fps} FPS`] }), (0, is_composition_still_1.isCompositionStill)(video) ? ((0, jsx_runtime_1.jsx)("div", { style: subtitle, children: "Still" })) : ((0, jsx_runtime_1.jsxs)("div", { style: subtitle, children: ["Duration ", (0, render_frame_1.renderFrame)(video.durationInFrames, video.fps)] }))] }) }) }));
};
exports.CurrentComposition = CurrentComposition;

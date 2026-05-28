"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const TimelineListItem_1 = require("./TimelineListItem");
const TimelineTimeIndicators_1 = require("./TimelineTimeIndicators");
const container = {
    flex: 1,
    background: colors_1.BACKGROUND,
};
const TimelineList = ({ timeline }) => {
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        shouldApplyCssTransforms: false,
        triggerOnWindowResize: false,
    });
    const isCompact = size ? size.width < 250 : false;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: container, children: [(0, jsx_runtime_1.jsx)(TimelineTimeIndicators_1.TimelineTimePadding, {}), timeline.map((track) => {
                return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(TimelineListItem_1.TimelineListItem, { nestedDepth: track.depth, sequence: track.sequence, isCompact: isCompact }, track.sequence.id) }, track.sequence.id));
            })] }));
};
exports.TimelineList = TimelineList;

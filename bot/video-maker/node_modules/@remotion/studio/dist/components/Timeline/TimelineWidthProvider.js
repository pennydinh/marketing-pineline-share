"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineWidthProvider = exports.TimelineWidthContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const timeline_refs_1 = require("./timeline-refs");
exports.TimelineWidthContext = (0, react_1.createContext)(null);
const TimelineWidthProvider = ({ children }) => {
    var _a;
    const size = player_1.PlayerInternals.useElementSize(timeline_refs_1.sliderAreaRef, {
        triggerOnWindowResize: false,
        shouldApplyCssTransforms: true,
    });
    return ((0, jsx_runtime_1.jsx)(exports.TimelineWidthContext.Provider, { value: (_a = size === null || size === void 0 ? void 0 : size.width) !== null && _a !== void 0 ? _a : null, children: children }));
};
exports.TimelineWidthProvider = TimelineWidthProvider;

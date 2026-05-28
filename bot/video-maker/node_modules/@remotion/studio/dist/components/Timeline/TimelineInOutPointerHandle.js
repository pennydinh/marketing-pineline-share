"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineInOutPointerHandle = exports.outPointerHandle = exports.inPointerHandle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../../helpers/colors");
const get_left_of_timeline_slider_1 = require("../../helpers/get-left-of-timeline-slider");
const TimelineWidthProvider_1 = require("./TimelineWidthProvider");
const line = {
    height: '100%',
    width: 1,
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    cursor: 'ew-resize',
    paddingLeft: 1,
    paddingRight: 1,
};
exports.inPointerHandle = (0, react_1.createRef)();
exports.outPointerHandle = (0, react_1.createRef)();
const InnerTimelineInOutPointerHandle = ({ atFrame, dragging, timelineWidth, type }) => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const style = (0, react_1.useMemo)(() => {
        return {
            ...line,
            backgroundColor: dragging
                ? colors_1.LIGHT_TRANSPARENT
                : 'rgba(255, 255, 255, 0.1)',
            transform: `translateX(${(0, get_left_of_timeline_slider_1.getXPositionOfItemInTimelineImperatively)(atFrame, videoConfig.durationInFrames, timelineWidth)}px)`,
        };
    }, [atFrame, dragging, timelineWidth, videoConfig.durationInFrames]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: type === 'in' ? exports.inPointerHandle : exports.outPointerHandle, style: style }));
};
const TimelineInOutPointerHandle = ({ dragging, type, atFrame, }) => {
    const timelineWidth = (0, react_1.useContext)(TimelineWidthProvider_1.TimelineWidthContext);
    // When switching from a content which has no timeline (still or asset preview)
    // the timeline first needs to mount, so we need to wait for the timeline width
    if (timelineWidth === null) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(InnerTimelineInOutPointerHandle, { atFrame: atFrame, dragging: dragging, timelineWidth: timelineWidth, type: type }));
};
exports.TimelineInOutPointerHandle = TimelineInOutPointerHandle;

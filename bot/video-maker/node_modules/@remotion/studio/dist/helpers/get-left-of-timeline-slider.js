"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getXPositionOfItemInTimelineImperatively = void 0;
const timeline_layout_1 = require("./timeline-layout");
const getXPositionOfItemInTimelineImperatively = (frame, duration, width) => {
    const proportion = frame / (duration - 1);
    return proportion * (width - timeline_layout_1.TIMELINE_PADDING * 2) + timeline_layout_1.TIMELINE_PADDING;
};
exports.getXPositionOfItemInTimelineImperatively = getXPositionOfItemInTimelineImperatively;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineTimeIndicators = exports.TimelineTimePadding = exports.TimelineTimePlaceholders = exports.TIMELINE_TIME_INDICATOR_HEIGHT = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../../helpers/colors");
const timeline_layout_1 = require("../../helpers/timeline-layout");
const render_frame_1 = require("../../state/render-frame");
const SplitterHandle_1 = require("../Splitter/SplitterHandle");
const TimeValue_1 = require("../TimeValue");
const TimelineWidthProvider_1 = require("./TimelineWidthProvider");
const timeline_refs_1 = require("./timeline-refs");
const timeline_scroll_logic_1 = require("./timeline-scroll-logic");
exports.TIMELINE_TIME_INDICATOR_HEIGHT = 39;
const container = {
    height: exports.TIMELINE_TIME_INDICATOR_HEIGHT - 4,
    boxShadow: `0 0 4px ${colors_1.TIMELINE_BACKGROUND}`,
    position: 'absolute',
    backgroundColor: colors_1.TIMELINE_BACKGROUND,
    top: 0,
};
const tick = {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    height: 20,
    position: 'absolute',
};
const secondTick = {
    ...tick,
    height: 15,
};
const tickLabel = {
    fontSize: 12,
    marginLeft: 8,
    marginTop: 7,
    color: colors_1.LIGHT_TEXT,
};
const timeValue = {
    height: exports.TIMELINE_TIME_INDICATOR_HEIGHT,
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingLeft: 10,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors_1.BACKGROUND,
    borderBottom: `${timeline_layout_1.TIMELINE_ITEM_BORDER_BOTTOM}px solid ${colors_1.TIMELINE_TRACK_SEPARATOR}`,
};
const TimelineTimePlaceholders = () => {
    return ((0, jsx_runtime_1.jsx)("div", { style: timeValue, children: (0, jsx_runtime_1.jsx)(TimeValue_1.TimeValue, {}) }));
};
exports.TimelineTimePlaceholders = TimelineTimePlaceholders;
const TimelineTimePadding = () => {
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            height: exports.TIMELINE_TIME_INDICATOR_HEIGHT,
        } }));
};
exports.TimelineTimePadding = TimelineTimePadding;
const TimelineTimeIndicators = () => {
    const sliderTrack = (0, react_1.useContext)(TimelineWidthProvider_1.TimelineWidthContext);
    const video = remotion_1.Internals.useVideo();
    if (sliderTrack === null) {
        return null;
    }
    if (video === null) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)(Inner, { durationInFrames: video.durationInFrames, fps: video.fps, windowWidth: sliderTrack }));
};
exports.TimelineTimeIndicators = TimelineTimeIndicators;
const Inner = ({ windowWidth, durationInFrames, fps }) => {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        const currentRef = ref.current;
        if (!currentRef) {
            return;
        }
        const { current } = timeline_refs_1.timelineVerticalScroll;
        if (!current) {
            return;
        }
        const onScroll = () => {
            currentRef.style.top = current.scrollTop + 'px';
        };
        current.addEventListener('scroll', onScroll);
        return () => {
            current.removeEventListener('scroll', onScroll);
        };
    }, []);
    const style = (0, react_1.useMemo)(() => {
        return {
            ...container,
            width: windowWidth - SplitterHandle_1.SPLITTER_HANDLE_SIZE / 2,
            overflow: 'hidden',
            // Since
            marginLeft: SplitterHandle_1.SPLITTER_HANDLE_SIZE / 2,
            pointerEvents: 'none',
        };
    }, [windowWidth]);
    const ticks = (0, react_1.useMemo)(() => {
        const frameInterval = (0, timeline_scroll_logic_1.getFrameIncrementFromWidth)(durationInFrames, windowWidth);
        const MIN_SPACING_BETWEEN_TICKS_PX = 5;
        const seconds = Math.floor(durationInFrames / fps);
        const secondMarkerEveryNth = Math.ceil((MIN_SPACING_BETWEEN_TICKS_PX * fps) / (frameInterval * fps));
        const frameMarkerEveryNth = Math.ceil(MIN_SPACING_BETWEEN_TICKS_PX / frameInterval);
        // Big ticks showing for every second
        const secondTicks = new Array(seconds)
            .fill(true)
            .map((_, index) => {
            return {
                frame: index * fps,
                style: {
                    ...secondTick,
                    left: frameInterval * index * fps +
                        timeline_layout_1.TIMELINE_PADDING -
                        SplitterHandle_1.SPLITTER_HANDLE_SIZE / 2,
                },
                showTime: index > 0,
            };
        })
            .filter((_, idx) => idx % secondMarkerEveryNth === 0);
        const frameTicks = new Array(durationInFrames)
            .fill(true)
            .map((_, index) => {
            return {
                frame: index,
                style: {
                    ...tick,
                    left: frameInterval * index +
                        timeline_layout_1.TIMELINE_PADDING -
                        SplitterHandle_1.SPLITTER_HANDLE_SIZE / 2,
                    height: index % fps === 0
                        ? 10
                        : (index / frameMarkerEveryNth) % 2 === 0
                            ? 5
                            : 2,
                },
                showTime: false,
            };
        })
            .filter((_, idx) => idx % frameMarkerEveryNth === 0);
        // Merge and deduplicate ticks
        const hasTicks = [];
        return [...secondTicks, ...frameTicks].filter((t) => {
            const alreadyUsed = hasTicks.find((ht) => ht === t.frame) !== undefined;
            hasTicks.push(t.frame);
            return !alreadyUsed;
        });
    }, [durationInFrames, fps, windowWidth]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, style: style, children: ticks.map((t) => {
            return ((0, jsx_runtime_1.jsx)("div", { style: t.style, children: t.showTime ? ((0, jsx_runtime_1.jsx)("div", { style: tickLabel, children: (0, render_frame_1.renderFrame)(t.frame, fps) })) : null }, t.frame));
        }) }));
};

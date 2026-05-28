"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSlider = exports.redrawTimelineSliderFast = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const get_left_of_timeline_slider_1 = require("../../helpers/get-left-of-timeline-slider");
const TimelineSliderHandle_1 = require("./TimelineSliderHandle");
const TimelineWidthProvider_1 = require("./TimelineWidthProvider");
const imperative_state_1 = require("./imperative-state");
const timeline_refs_1 = require("./timeline-refs");
const container = {
    position: 'absolute',
    bottom: 0,
    top: 0,
    pointerEvents: 'none',
};
const line = {
    height: '100vh',
    width: 1,
    position: 'fixed',
    backgroundColor: '#f02c00',
};
exports.redrawTimelineSliderFast = (0, react_1.createRef)();
const TimelineSlider = () => {
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const timelineWidth = (0, react_1.useContext)(TimelineWidthProvider_1.TimelineWidthContext);
    if (videoConfig === null || timelineWidth === null) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(Inner, {});
};
exports.TimelineSlider = TimelineSlider;
const Inner = () => {
    const videoConfig = (0, remotion_1.useVideoConfig)();
    const timelinePosition = remotion_1.Internals.Timeline.useTimelinePosition();
    const ref = (0, react_1.useRef)(null);
    const timelineWidth = (0, react_1.useContext)(TimelineWidthProvider_1.TimelineWidthContext);
    if (timelineWidth === null) {
        throw new Error('Unexpectedly did not have timeline width');
    }
    const style = (0, react_1.useMemo)(() => {
        const left = (0, get_left_of_timeline_slider_1.getXPositionOfItemInTimelineImperatively)(timelinePosition, videoConfig.durationInFrames, timelineWidth);
        return {
            ...container,
            transform: `translateX(${left}px)`,
        };
    }, [timelinePosition, videoConfig.durationInFrames, timelineWidth]);
    (0, react_1.useImperativeHandle)(exports.redrawTimelineSliderFast, () => {
        return {
            draw: (frame, width) => {
                var _a, _b;
                const { current } = ref;
                if (!current) {
                    throw new Error('unexpectedly did not have ref to timelineslider');
                }
                current.style.transform = `translateX(${(0, get_left_of_timeline_slider_1.getXPositionOfItemInTimelineImperatively)(frame, (0, imperative_state_1.getCurrentDuration)(), (_b = width !== null && width !== void 0 ? width : (_a = timeline_refs_1.sliderAreaRef.current) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0)}px)`;
            },
        };
    }, []);
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
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, style: style, children: [(0, jsx_runtime_1.jsx)("div", { style: line }), (0, jsx_runtime_1.jsx)(TimelineSliderHandle_1.TimelineSliderHandle, {})] }));
};

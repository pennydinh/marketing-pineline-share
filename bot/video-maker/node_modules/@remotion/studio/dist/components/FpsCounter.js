"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FpsCounter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const label = {
    color: 'white',
    fontSize: 15,
    fontFamily: 'Arial, Helvetica, sans-serif',
};
const pushWithMaxSize = (arr, value, maxSize) => {
    arr.push(value);
    return arr.slice(-maxSize);
};
const FpsCounter = ({ playbackSpeed }) => {
    const videoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    const [playing] = remotion_1.Internals.Timeline.usePlayingState();
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const [marker, rerender] = (0, react_1.useState)({});
    const [fps, setFps] = (0, react_1.useState)(0);
    const previousUpdates = (0, react_1.useRef)([]);
    const fpsRef = (0, react_1.useRef)(0);
    const playingRef = (0, react_1.useRef)(playing);
    (0, react_1.useLayoutEffect)(() => {
        fpsRef.current = 0;
        previousUpdates.current = [];
        playingRef.current = playing;
    }, [playing]);
    (0, react_1.useLayoutEffect)(() => {
        if (playingRef.current === false)
            return;
        previousUpdates.current = pushWithMaxSize(previousUpdates.current, performance.now(), 15);
        if (previousUpdates.current.length < 2)
            return;
        const diff = Math.max(...previousUpdates.current) -
            Math.min(...previousUpdates.current);
        const averageDistanceBetween = diff / (previousUpdates.current.length - 1);
        fpsRef.current = 1000 / averageDistanceBetween;
        if (previousUpdates.current.length === 2)
            setFps(fpsRef.current);
        /* This effect should depends only on frame, otherwise it will push extra updates to ref and fps will be wrong */
    }, [frame]);
    (0, react_1.useEffect)(() => {
        if (playing) {
            const t = setTimeout(() => {
                rerender({});
                setFps(fpsRef.current);
            }, 1000);
            return () => clearTimeout(t);
        }
    }, [marker, playing]);
    const style = (0, react_1.useMemo)(() => {
        if (!videoConfig) {
            return {};
        }
        const expectedFps = Math.abs(playbackSpeed) * videoConfig.fps;
        return {
            ...label,
            color: fps < expectedFps * 0.9 ? 'red' : 'white',
        };
    }, [fps, playbackSpeed, videoConfig]);
    if (fps === 0) {
        return null;
    }
    if (playing === false) {
        return null;
    }
    if (videoConfig === null) {
        return null;
    }
    return (0, jsx_runtime_1.jsxs)("div", { style: style, children: [fps.toFixed(1), " FPS"] });
};
exports.FpsCounter = FpsCounter;

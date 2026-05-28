"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FramePersistor = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const FramePersistor = () => {
    const [playing] = remotion_1.Internals.Timeline.usePlayingState();
    const config = (0, remotion_1.useVideoConfig)();
    const frame = remotion_1.Internals.Timeline.useTimelinePosition();
    const setFrame = remotion_1.Internals.useTimelineSetFrame();
    (0, react_1.useEffect)(() => {
        if (!playing) {
            setFrame((f) => {
                const newObj = { ...f, [config.id]: frame };
                remotion_1.Internals.persistCurrentFrame(newObj);
                return newObj;
            });
        }
    }, [config.id, frame, playing, setFrame]);
    return null;
};
exports.FramePersistor = FramePersistor;

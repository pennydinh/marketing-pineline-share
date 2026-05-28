"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaybackRatePersistor = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const playbackrate_1 = require("../state/playbackrate");
const PlaybackRatePersistor = () => {
    const { setPlaybackRate, playbackRate } = (0, react_1.useContext)(remotion_1.Internals.Timeline.TimelineContext);
    (0, react_1.useEffect)(() => {
        setPlaybackRate((0, playbackrate_1.loadPlaybackRate)());
    }, [setPlaybackRate]);
    (0, react_1.useEffect)(() => {
        (0, playbackrate_1.persistPlaybackRate)(playbackRate);
    }, [playbackRate]);
    return null;
};
exports.PlaybackRatePersistor = PlaybackRatePersistor;

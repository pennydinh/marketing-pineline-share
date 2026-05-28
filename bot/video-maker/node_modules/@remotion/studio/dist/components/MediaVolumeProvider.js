"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaVolumeProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const mute_1 = require("../state/mute");
const MediaVolumeProvider = ({ children }) => {
    const [mediaMuted, setMediaMuted] = (0, react_1.useState)(() => (0, mute_1.loadMuteOption)());
    const [mediaVolume, setMediaVolume] = (0, react_1.useState)(1);
    const mediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            mediaMuted,
            mediaVolume,
        };
    }, [mediaMuted, mediaVolume]);
    const setMediaVolumeContextValue = (0, react_1.useMemo)(() => {
        return {
            setMediaMuted,
            setMediaVolume,
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(remotion_1.Internals.MediaVolumeContext.Provider, { value: mediaVolumeContextValue, children: (0, jsx_runtime_1.jsx)(remotion_1.Internals.SetMediaVolumeContext.Provider, { value: setMediaVolumeContextValue, children: children }) }));
};
exports.MediaVolumeProvider = MediaVolumeProvider;

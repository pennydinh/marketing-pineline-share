"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MuteToggle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const media_volume_1 = require("../icons/media-volume");
const mute_1 = require("../state/mute");
const ControlButton_1 = require("./ControlButton");
const MuteToggle = ({ muted, setMuted }) => {
    const onClick = (0, react_1.useCallback)(() => {
        setMuted((m) => {
            (0, mute_1.persistMuteOption)(!m);
            return !m;
        });
    }, [setMuted]);
    const accessibilityLabel = muted ? 'Unmute video' : 'Mute video';
    return ((0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { title: accessibilityLabel, "aria-label": accessibilityLabel, onClick: onClick, children: muted ? (0, jsx_runtime_1.jsx)(media_volume_1.VolumeOffIcon, {}) : (0, jsx_runtime_1.jsx)(media_volume_1.VolumeOnIcon, {}) }));
};
exports.MuteToggle = MuteToggle;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioWaveformBar = exports.WAVEFORM_BAR_MARGIN = exports.WAVEFORM_BAR_LENGTH = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const timeline_layout_1 = require("../helpers/timeline-layout");
exports.WAVEFORM_BAR_LENGTH = 4;
exports.WAVEFORM_BAR_MARGIN = 2;
const container = {
    width: exports.WAVEFORM_BAR_LENGTH,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: exports.WAVEFORM_BAR_MARGIN,
    borderRadius: 2,
};
const AudioWaveformBar = ({ amplitude }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            ...container,
            height: (timeline_layout_1.TIMELINE_LAYER_HEIGHT / 2) * amplitude,
        };
    }, [amplitude]);
    return (0, jsx_runtime_1.jsx)("div", { style: style });
};
exports.AudioWaveformBar = AudioWaveformBar;

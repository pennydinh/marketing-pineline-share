"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnforceAudioTrackSetting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Checkbox_1 = require("../Checkbox");
const layout_1 = require("../layout");
const OptionExplainerBubble_1 = require("./OptionExplainerBubble");
const layout_2 = require("./layout");
const EnforceAudioTrackSetting = ({ enforceAudioTrack, muted, setEnforceAudioTrack }) => {
    const onEnforceAudioTrackChanged = (0, react_1.useCallback)((e) => {
        setEnforceAudioTrack(e.target.checked);
    }, [setEnforceAudioTrack]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["Enforce Audio Track", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "enforceAudioOption" })] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { disabled: muted && !enforceAudioTrack, checked: enforceAudioTrack, onChange: onEnforceAudioTrackChanged, name: "enforce-audio-track" }) })] }));
};
exports.EnforceAudioTrackSetting = EnforceAudioTrackSetting;

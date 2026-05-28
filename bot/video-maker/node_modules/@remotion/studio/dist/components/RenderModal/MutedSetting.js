"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutedSetting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Checkbox_1 = require("../Checkbox");
const layout_1 = require("../layout");
const OptionExplainerBubble_1 = require("./OptionExplainerBubble");
const layout_2 = require("./layout");
const MutedSetting = ({ muted, setMuted, enforceAudioTrack }) => {
    const onMutedChanged = (0, react_1.useCallback)((e) => {
        setMuted(e.target.checked);
    }, [setMuted]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["Muted", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "mutedOption" })] }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.25 }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: muted, disabled: enforceAudioTrack && !muted, onChange: onMutedChanged, name: "muted" }) })] }));
};
exports.MutedSetting = MutedSetting;

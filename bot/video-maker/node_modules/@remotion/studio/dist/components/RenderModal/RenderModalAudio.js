"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderModalAudio = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@remotion/renderer/client");
const react_1 = require("react");
const Checkmark_1 = require("../../icons/Checkmark");
const Checkbox_1 = require("../Checkbox");
const is_menu_item_1 = require("../Menu/is-menu-item");
const ComboBox_1 = require("../NewComposition/ComboBox");
const RemInput_1 = require("../NewComposition/RemInput");
const layout_1 = require("../layout");
const EnforceAudioTrackSetting_1 = require("./EnforceAudioTrackSetting");
const MutedSetting_1 = require("./MutedSetting");
const OptionExplainerBubble_1 = require("./OptionExplainerBubble");
const RenderModalHr_1 = require("./RenderModalHr");
const SeparateAudioOption_1 = require("./SeparateAudioOption");
const human_readable_audio_codecs_1 = require("./human-readable-audio-codecs");
const layout_2 = require("./layout");
const container = {
    flex: 1,
    overflowY: 'auto',
};
const RenderModalAudio = ({ muted, setMuted, renderMode, enforceAudioTrack, setEnforceAudioTrackState, setShouldHaveCustomTargetAudioBitrate, shouldHaveCustomTargetAudioBitrate, setCustomTargetAudioBitrateValue, customTargetAudioBitrate, audioCodec, codec, setAudioCodec, forSeamlessAacConcatenation, setForSeamlessAacConcatenation, separateAudioTo, setSeparateAudioTo, outName, }) => {
    const onShouldHaveTargetAudioBitrateChanged = (0, react_1.useCallback)((e) => {
        setShouldHaveCustomTargetAudioBitrate(e.target.checked);
    }, [setShouldHaveCustomTargetAudioBitrate]);
    const onTargetAudioBitrateChanged = (0, react_1.useCallback)((e) => {
        setCustomTargetAudioBitrateValue(e.target.value);
    }, [setCustomTargetAudioBitrateValue]);
    const onSeamlessAacConcatenationChanges = (0, react_1.useCallback)((e) => {
        setForSeamlessAacConcatenation(e.target.checked);
    }, [setForSeamlessAacConcatenation]);
    const audioCodecOptions = (0, react_1.useCallback)((currentCodec) => {
        return client_1.BrowserSafeApis.supportedAudioCodecs[currentCodec].map((audioCodecOption) => {
            return {
                label: (0, human_readable_audio_codecs_1.humanReadableAudioCodec)(audioCodecOption),
                onClick: () => setAudioCodec(audioCodecOption),
                key: audioCodecOption,
                leftItem: codec === audioCodecOption ? (0, jsx_runtime_1.jsx)(Checkmark_1.Checkmark, {}) : null,
                id: audioCodecOption,
                keyHint: null,
                quickSwitcherLabel: null,
                subMenu: null,
                type: 'item',
                value: audioCodecOption,
            };
        });
    }, [codec, setAudioCodec]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, className: is_menu_item_1.VERTICAL_SCROLLBAR_CLASSNAME, children: [renderMode === 'video' ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(MutedSetting_1.MutedSetting, { enforceAudioTrack: enforceAudioTrack, muted: muted, setMuted: setMuted }), (0, jsx_runtime_1.jsx)(RenderModalHr_1.RenderModalHr, {})] })) : null, renderMode === 'video' &&
                audioCodecOptions(codec).length >= 2 &&
                !muted ? ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["Audio Codec ", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "audioCodecOption" })] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(ComboBox_1.Combobox, { values: audioCodecOptions(codec), selectedId: audioCodec, title: "AudioCodec" }) })] })) : null, (renderMode === 'video' || renderMode === 'audio') && !muted && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(EnforceAudioTrackSetting_1.EnforceAudioTrackSetting, { muted: muted, enforceAudioTrack: enforceAudioTrack, setEnforceAudioTrack: setEnforceAudioTrackState }), (0, jsx_runtime_1.jsx)(RenderModalHr_1.RenderModalHr, {})] })), renderMode === 'video' && !muted ? ((0, jsx_runtime_1.jsx)(SeparateAudioOption_1.SeparateAudioOption, { separateAudioTo: separateAudioTo, setSeparateAudioTo: setSeparateAudioTo, audioCodec: audioCodec, outName: outName })) : null, audioCodec === 'aac' && !muted ? ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["For seamless AAC concatenation", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "forSeamlessAacConcatenationOption" })] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { disabled: false, checked: forSeamlessAacConcatenation, onChange: onSeamlessAacConcatenationChanges, name: "enforce-audio-track" }) })] })) : null, renderMode === 'still' || muted ? null : ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["Custom audio bitrate", ' ', (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "audioBitrateOption" })] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { checked: shouldHaveCustomTargetAudioBitrate, onChange: onShouldHaveTargetAudioBitrateChanged, name: "custom-audio-bitrate" }) })] })), shouldHaveCustomTargetAudioBitrate &&
                renderMode !== 'still' &&
                !muted ? ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsx)("div", { style: layout_2.label, children: "Target audio bitrate" }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(RemInput_1.RemotionInput, { style: layout_2.input, value: customTargetAudioBitrate, onChange: onTargetAudioBitrateChanged, status: "ok", rightAlign: true }) }) })] })) : null] }));
};
exports.RenderModalAudio = RenderModalAudio;

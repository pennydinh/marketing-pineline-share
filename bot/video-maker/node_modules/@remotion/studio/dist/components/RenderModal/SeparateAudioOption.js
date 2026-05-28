"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeparateAudioOption = exports.SeparateAudioOptionInput = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@remotion/renderer/client");
const react_1 = require("react");
const use_file_existence_1 = require("../../helpers/use-file-existence");
const Checkbox_1 = require("../Checkbox");
const layout_1 = require("../layout");
const OptionExplainerBubble_1 = require("./OptionExplainerBubble");
const RenderModalOutputName_1 = require("./RenderModalOutputName");
const get_string_before_suffix_1 = require("./get-string-before-suffix");
const layout_2 = require("./layout");
const SeparateAudioOptionInput = ({ separateAudioTo, setSeparateAudioTo, audioCodec }) => {
    const existence = (0, use_file_existence_1.useFileExistence)(separateAudioTo);
    const onValueChange = (0, react_1.useCallback)((e) => {
        setSeparateAudioTo(e.target.value);
    }, [setSeparateAudioTo]);
    const validationMessage = (0, react_1.useMemo)(() => {
        const expectedExtension = client_1.BrowserSafeApis.getExtensionFromAudioCodec(audioCodec);
        const actualExtension = separateAudioTo.split('.').pop();
        if (actualExtension !== expectedExtension) {
            return `Expected extension: .${expectedExtension}`;
        }
        return null;
    }, [audioCodec, separateAudioTo]);
    return ((0, jsx_runtime_1.jsx)(RenderModalOutputName_1.RenderModalOutputName, { existence: existence, inputStyle: layout_2.input, onValueChange: onValueChange, outName: separateAudioTo, label: 'Separate audio to', validationMessage: validationMessage }));
};
exports.SeparateAudioOptionInput = SeparateAudioOptionInput;
const SeparateAudioOption = ({ separateAudioTo, setSeparateAudioTo, audioCodec, outName }) => {
    const onSeparateAudioChange = (0, react_1.useCallback)((e) => {
        if (e.target.checked) {
            const extension = client_1.BrowserSafeApis.getExtensionFromAudioCodec(audioCodec);
            setSeparateAudioTo(`${(0, get_string_before_suffix_1.getStringBeforeSuffix)(outName)}.${extension}`);
        }
        else {
            setSeparateAudioTo(null);
        }
    }, [audioCodec, outName, setSeparateAudioTo]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: ["Separate audio", (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: "separateAudioOption" })] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(Checkbox_1.Checkbox, { disabled: false, checked: Boolean(separateAudioTo), onChange: onSeparateAudioChange, name: "separate-audio-to" }) })] }), separateAudioTo === null ? null : ((0, jsx_runtime_1.jsx)(exports.SeparateAudioOptionInput, { separateAudioTo: separateAudioTo, setSeparateAudioTo: setSeparateAudioTo, audioCodec: audioCodec }))] }));
};
exports.SeparateAudioOption = SeparateAudioOption;

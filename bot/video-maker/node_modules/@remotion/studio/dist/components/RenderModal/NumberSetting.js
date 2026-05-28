"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberSetting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InputDragger_1 = require("../NewComposition/InputDragger");
const RemInput_1 = require("../NewComposition/RemInput");
const layout_1 = require("../layout");
const OptionExplainerBubble_1 = require("./OptionExplainerBubble");
const layout_2 = require("./layout");
const NumberSetting = ({ name, value, step, hint, onValueChanged, max, min, formatter }) => {
    const onTextChanged = (0, react_1.useCallback)((e) => {
        onValueChanged((q) => {
            const newSetting = step < 1 ? parseFloat(e) : parseInt(e, 10);
            if (Number.isNaN(newSetting)) {
                return q;
            }
            return Math.min(max !== null && max !== void 0 ? max : Infinity, Math.max(newSetting, min));
        });
    }, [max, min, onValueChanged, step]);
    const onValueChange = (0, react_1.useCallback)((newConcurrency) => {
        onValueChanged(newConcurrency);
    }, [onValueChanged]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsxs)("div", { style: layout_2.label, children: [name, hint ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(OptionExplainerBubble_1.OptionExplainerBubble, { id: hint })] })) : null] }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsx)(RemInput_1.RightAlignInput, { children: (0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { value: value, name: name.toLowerCase(), onTextChange: onTextChanged, onValueChange: onValueChange, step: step, placeholder: [min, max]
                            .map((f) => (f !== null && f !== undefined ? f : ''))
                            .join('-'), min: min, max: max, formatter: formatter, status: "ok", rightAlign: true }) }) })] }));
};
exports.NumberSetting = NumberSetting;

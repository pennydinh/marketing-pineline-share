"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewCompDuration = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const validate_new_comp_data_1 = require("../../helpers/validate-new-comp-data");
const layout_1 = require("../RenderModal/layout");
const layout_2 = require("../layout");
const InputDragger_1 = require("./InputDragger");
const ValidationMessage_1 = require("./ValidationMessage");
const NewCompDuration = ({ durationInFrames, setDurationInFrames }) => {
    const onDurationInFramesChanged = (0, react_1.useCallback)((newValue) => {
        setDurationInFrames(Number(newValue));
    }, [setDurationInFrames]);
    const onDurationChangedDirectly = (0, react_1.useCallback)((newVal) => {
        setDurationInFrames(newVal);
    }, [setDurationInFrames]);
    const compDurationErrMessage = (0, validate_new_comp_data_1.validateCompositionDuration)(durationInFrames);
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_1.optionRow, children: [(0, jsx_runtime_1.jsx)("div", { style: layout_1.label, children: "Duration in frames" }), (0, jsx_runtime_1.jsxs)("div", { style: layout_1.rightRow, children: [(0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { type: "number", value: durationInFrames, onTextChange: onDurationInFramesChanged, placeholder: "Duration (frames)", name: "durationInFrames", min: 1, step: 1, required: true, status: "ok", 
                        // Hitting Promise.all() limit in Chrome
                        max: 300000, onValueChange: onDurationChangedDirectly, rightAlign: false }), compDurationErrMessage ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_2.Spacing, { y: 1, block: true }), (0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { align: "flex-start", message: compDurationErrMessage, type: "error" })] })) : null] })] }));
};
exports.NewCompDuration = NewCompDuration;

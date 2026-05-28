"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodFieldValidation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const layout_1 = require("../../layout");
const ValidationMessage_1 = require("../../NewComposition/ValidationMessage");
const InfoBubble_1 = require("../InfoBubble");
const legend = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
};
const stackTrace = {
    padding: 10,
};
const stackTraceLabel = {
    fontSize: 14,
};
const ZodFieldValidation = ({ localValue, path }) => {
    if (localValue.zodValidation.success) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)("div", { style: legend, children: [(0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { align: "flex-start", message: localValue.zodValidation.error.format()._errors[0], type: "error" }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(InfoBubble_1.InfoBubble, { title: "Zod validation failure", children: (0, jsx_runtime_1.jsxs)("div", { style: stackTrace, children: [(0, jsx_runtime_1.jsx)("div", { style: stackTraceLabel, children: "Zod Validation has failed:" }), localValue.zodValidation.error.errors.map((error, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        (0, jsx_runtime_1.jsxs)("div", { style: stackTraceLabel, children: ["Type: ", error.code, " ", (0, jsx_runtime_1.jsx)("br", {}), "Message: ", error.message, (0, jsx_runtime_1.jsx)("br", {}), "Path: ", path.join('.')] }, index)))] }) }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 })] }));
};
exports.ZodFieldValidation = ZodFieldValidation;

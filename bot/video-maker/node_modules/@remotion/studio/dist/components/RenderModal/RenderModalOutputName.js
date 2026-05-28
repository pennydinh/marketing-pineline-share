"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderModalOutputName = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const RemInput_1 = require("../NewComposition/RemInput");
const ValidationMessage_1 = require("../NewComposition/ValidationMessage");
const layout_1 = require("../layout");
const layout_2 = require("./layout");
const RenderModalOutputName = ({ existence, inputStyle, outName, onValueChange, validationMessage, label: labelText, }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_2.optionRow, children: [(0, jsx_runtime_1.jsx)(layout_1.Column, { children: (0, jsx_runtime_1.jsx)("div", { style: layout_2.label, children: labelText }) }), (0, jsx_runtime_1.jsx)("div", { style: layout_2.rightRow, children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)(RemInput_1.RemotionInput, { status: validationMessage ? 'error' : existence ? 'warning' : 'ok', style: inputStyle, type: "text", value: outName, onChange: onValueChange, rightAlign: true }), validationMessage ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1, block: true }), (0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { align: "flex-end", message: validationMessage, type: 'error' })] })) : existence ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(layout_1.Spacing, { y: 1, block: true }), (0, jsx_runtime_1.jsx)(ValidationMessage_1.ValidationMessage, { align: "flex-end", message: "Will be overwritten", type: 'warning' })] })) : null] }) })] }));
};
exports.RenderModalOutputName = RenderModalOutputName;

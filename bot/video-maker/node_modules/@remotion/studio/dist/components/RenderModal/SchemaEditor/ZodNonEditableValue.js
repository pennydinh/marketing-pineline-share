"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZonNonEditableValue = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../../helpers/colors");
const Fieldset_1 = require("./Fieldset");
const SchemaLabel_1 = require("./SchemaLabel");
const fullWidth = {
    width: '100%',
};
const emptyLabel = {
    width: '100%',
    color: colors_1.VERY_LIGHT_TEXT,
    fontFamily: 'sans-serif',
    fontSize: 14,
};
const wideEmptyLabel = {
    ...emptyLabel,
    lineHeight: '37px',
};
const ZonNonEditableValue = ({ jsonPath, label, showSaveButton, saving, mayPad }) => {
    const save = (0, react_1.useCallback)(() => undefined, []);
    const reset = (0, react_1.useCallback)(() => undefined, []);
    return ((0, jsx_runtime_1.jsxs)(Fieldset_1.Fieldset, { shouldPad: mayPad, success: true, children: [(0, jsx_runtime_1.jsx)(SchemaLabel_1.SchemaLabel, { handleClick: null, isDefaultValue: true, jsonPath: jsonPath, onReset: reset, onSave: save, showSaveButton: showSaveButton, onRemove: null, saving: saving, valid: true, saveDisabledByParent: true, suffix: null }), (0, jsx_runtime_1.jsx)("div", { style: fullWidth, children: (0, jsx_runtime_1.jsx)("em", { style: wideEmptyLabel, children: label }) })] }));
};
exports.ZonNonEditableValue = ZonNonEditableValue;

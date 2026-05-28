"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodDefaultEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ZodSwitch_1 = require("./ZodSwitch");
const ZodDefaultEditor = ({ jsonPath, schema, setValue, onSave, defaultValue, value, showSaveButton, onRemove, saving, saveDisabledByParent, mayPad, }) => {
    const { innerType } = schema._def;
    return ((0, jsx_runtime_1.jsx)(ZodSwitch_1.ZodSwitch, { defaultValue: defaultValue, jsonPath: jsonPath, onRemove: onRemove, onSave: onSave, schema: innerType, setValue: setValue, showSaveButton: showSaveButton, value: value, saving: saving, saveDisabledByParent: saveDisabledByParent, mayPad: mayPad }));
};
exports.ZodDefaultEditor = ZodDefaultEditor;

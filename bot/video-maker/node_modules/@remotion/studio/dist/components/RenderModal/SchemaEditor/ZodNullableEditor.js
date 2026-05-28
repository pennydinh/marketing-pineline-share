"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodNullableEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ZodOrNullishEditor_1 = require("./ZodOrNullishEditor");
const ZodNullableEditor = ({ jsonPath, schema, setValue, onSave, defaultValue, value, showSaveButton, onRemove, saving, saveDisabledByParent, mayPad, }) => {
    const { innerType } = schema._def;
    return ((0, jsx_runtime_1.jsx)(ZodOrNullishEditor_1.ZodOrNullishEditor, { defaultValue: defaultValue, jsonPath: jsonPath, onRemove: onRemove, onSave: onSave, schema: schema, innerSchema: innerType, setValue: setValue, showSaveButton: showSaveButton, value: value, nullishValue: null, saving: saving, saveDisabledByParent: saveDisabledByParent, mayPad: mayPad }));
};
exports.ZodNullableEditor = ZodNullableEditor;

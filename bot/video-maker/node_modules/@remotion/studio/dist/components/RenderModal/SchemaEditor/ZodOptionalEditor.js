"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodOptionalEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ZodOrNullishEditor_1 = require("./ZodOrNullishEditor");
const ZodOptionalEditor = ({ jsonPath, schema, setValue, onSave, defaultValue, value, showSaveButton, onRemove, saving, saveDisabledByParent, mayPad, }) => {
    const { innerType } = schema._def;
    return ((0, jsx_runtime_1.jsx)(ZodOrNullishEditor_1.ZodOrNullishEditor, { defaultValue: defaultValue, jsonPath: jsonPath, onRemove: onRemove, onSave: onSave, schema: schema, setValue: setValue, showSaveButton: showSaveButton, value: value, nullishValue: undefined, saving: saving, saveDisabledByParent: saveDisabledByParent, mayPad: mayPad, innerSchema: innerType }));
};
exports.ZodOptionalEditor = ZodOptionalEditor;

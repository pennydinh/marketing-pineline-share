"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodUnionEditor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const get_zod_if_possible_1 = require("../../get-zod-if-possible");
const ZodNonEditableValue_1 = require("./ZodNonEditableValue");
const ZodOrNullishEditor_1 = require("./ZodOrNullishEditor");
const findNull = (value, zodType) => {
    const nullIndex = value.findIndex((v) => v._def.typeName === zodType.ZodFirstPartyTypeKind.ZodNull ||
        v._def.typeName === zodType.ZodFirstPartyTypeKind.ZodUndefined);
    if (nullIndex === -1) {
        return null;
    }
    const nullishValue = value[nullIndex]._def.typeName === zodType.ZodFirstPartyTypeKind.ZodNull
        ? null
        : undefined;
    const otherSchema = value[nullIndex === 0 ? 1 : 0];
    const otherSchemaIsAlsoNullish = otherSchema._def.typeName === zodType.ZodFirstPartyTypeKind.ZodNull ||
        otherSchema._def.typeName === zodType.ZodFirstPartyTypeKind.ZodUndefined;
    return {
        nullIndex,
        nullishValue,
        otherSchema,
        otherSchemaIsAlsoNullish,
    };
};
const ZodUnionEditor = ({ jsonPath, schema, setValue, onSave, defaultValue, value, showSaveButton, onRemove, saving, saveDisabledByParent, mayPad, }) => {
    const { options } = schema._def;
    const z = (0, get_zod_if_possible_1.useZodIfPossible)();
    if (!z) {
        throw new Error('expected zod');
    }
    if (options.length > 2) {
        return ((0, jsx_runtime_1.jsx)(ZodNonEditableValue_1.ZonNonEditableValue, { jsonPath: jsonPath, label: 'Union with more than 2 options not editable', showSaveButton: showSaveButton, saving: saving, mayPad: mayPad }));
    }
    if (options.length < 2) {
        return ((0, jsx_runtime_1.jsx)(ZodNonEditableValue_1.ZonNonEditableValue, { jsonPath: jsonPath, label: 'Union with less than 2 options not editable', showSaveButton: showSaveButton, saving: saving, mayPad: mayPad }));
    }
    const nullResult = findNull(options, z);
    if (!nullResult) {
        return ((0, jsx_runtime_1.jsx)(ZodNonEditableValue_1.ZonNonEditableValue, { jsonPath: jsonPath, label: 'Union only editable with 1 value being null', showSaveButton: showSaveButton, saving: saving, mayPad: mayPad }));
    }
    const { otherSchema, nullishValue, otherSchemaIsAlsoNullish } = nullResult;
    if (otherSchemaIsAlsoNullish) {
        return ((0, jsx_runtime_1.jsx)(ZodNonEditableValue_1.ZonNonEditableValue, { jsonPath: jsonPath, label: 'Not editable - both union values are nullish', showSaveButton: showSaveButton, saving: saving, mayPad: mayPad }));
    }
    return ((0, jsx_runtime_1.jsx)(ZodOrNullishEditor_1.ZodOrNullishEditor, { defaultValue: defaultValue, jsonPath: jsonPath, onRemove: onRemove, onSave: onSave, schema: schema, innerSchema: otherSchema, setValue: setValue, showSaveButton: showSaveButton, value: value, nullishValue: nullishValue, saving: saving, saveDisabledByParent: saveDisabledByParent, mayPad: mayPad }));
};
exports.ZodUnionEditor = ZodUnionEditor;

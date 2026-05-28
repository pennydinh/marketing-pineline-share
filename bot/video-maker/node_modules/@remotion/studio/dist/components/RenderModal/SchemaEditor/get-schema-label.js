"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchemaLabel = void 0;
const getSchemaLabel = (jsonPath) => {
    const lastKey = jsonPath[jsonPath.length - 1];
    if (typeof lastKey === 'number') {
        const secondLastKey = jsonPath[jsonPath.length - 2];
        if (typeof secondLastKey === 'undefined') {
            return `[${lastKey}]:`;
        }
        return `${lastKey}:`;
    }
    return `${lastKey}:`;
};
exports.getSchemaLabel = getSchemaLabel;

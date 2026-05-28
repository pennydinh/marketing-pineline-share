"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStringBeforeSuffix = void 0;
const getStringBeforeSuffix = (fileName) => {
    const dotPos = fileName.lastIndexOf('.');
    if (dotPos === -1) {
        return fileName;
    }
    return fileName.substring(0, dotPos);
};
exports.getStringBeforeSuffix = getStringBeforeSuffix;

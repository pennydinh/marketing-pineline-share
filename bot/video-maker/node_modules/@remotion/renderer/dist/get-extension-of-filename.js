"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtensionOfFilename = void 0;
const path_normalize_1 = require("./path-normalize");
const getExtensionOfFilename = (filename) => {
    if (filename === null) {
        return null;
    }
    const filenameArr = (0, path_normalize_1.pathNormalize)(filename).split('.');
    const hasExtension = filenameArr.length >= 2;
    const filenameArrLength = filenameArr.length;
    const extension = hasExtension ? filenameArr[filenameArrLength - 1] : null;
    return extension;
};
exports.getExtensionOfFilename = getExtensionOfFilename;

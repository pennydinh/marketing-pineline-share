"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPathInside = void 0;
const node_path_1 = __importDefault(require("node:path"));
const isPathInside = function (thePath, potentialParent) {
    // For inside-directory checking, we want to allow trailing slashes, so normalize.
    thePath = stripTrailingSep(thePath);
    potentialParent = stripTrailingSep(potentialParent);
    // Node treats only Windows as case-insensitive in its path module; we follow those conventions.
    if (process.platform === 'win32') {
        thePath = thePath.toLowerCase();
        potentialParent = potentialParent.toLowerCase();
    }
    return (thePath.lastIndexOf(potentialParent, 0) === 0 &&
        (thePath[potentialParent.length] === node_path_1.default.sep ||
            thePath[potentialParent.length] === undefined));
};
exports.isPathInside = isPathInside;
function stripTrailingSep(thePath) {
    if (thePath[thePath.length - 1] === node_path_1.default.sep) {
        return thePath.slice(0, -1);
    }
    return thePath;
}

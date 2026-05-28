"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRemotionRoot = exports.findClosestPackageJson = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const recursionLimit = 5;
const findClosestPackageJson = () => {
    let currentDir = process.cwd();
    let possiblePackageJson = '';
    for (let i = 0; i < recursionLimit; i++) {
        possiblePackageJson = node_path_1.default.join(currentDir, 'package.json');
        const exists = node_fs_1.default.existsSync(possiblePackageJson);
        if (exists) {
            return possiblePackageJson;
        }
        currentDir = node_path_1.default.dirname(currentDir);
    }
    return null;
};
exports.findClosestPackageJson = findClosestPackageJson;
const findRemotionRoot = () => {
    const closestPackageJson = (0, exports.findClosestPackageJson)();
    if (closestPackageJson === null) {
        return process.cwd();
    }
    return node_path_1.default.dirname(closestPackageJson);
};
exports.findRemotionRoot = findRemotionRoot;

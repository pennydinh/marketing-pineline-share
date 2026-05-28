"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureOutputDirectory = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const ensureOutputDirectory = (outputLocation) => {
    const dirName = node_path_1.default.dirname(outputLocation);
    if (!node_fs_1.default.existsSync(dirName)) {
        node_fs_1.default.mkdirSync(dirName, {
            recursive: true,
        });
    }
};
exports.ensureOutputDirectory = ensureOutputDirectory;

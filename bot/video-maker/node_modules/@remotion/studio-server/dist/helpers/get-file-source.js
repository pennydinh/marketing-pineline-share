"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileSource = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const allowedFileExtensions = ['js', 'ts', 'tsx', 'jsx', 'map', 'mjs'];
// Must be async function for proper error handling
const getFileSource = (remotionRoot, p) => {
    if (!allowedFileExtensions.find((extension) => p.endsWith(extension))) {
        return Promise.reject(new Error(`Not allowed to open ${p}`));
    }
    const resolved = node_path_1.default.resolve(remotionRoot, p);
    const relativeToProcessCwd = node_path_1.default.relative(remotionRoot, resolved);
    if (relativeToProcessCwd.startsWith('..')) {
        return Promise.reject(new Error(`Not allowed to open ${relativeToProcessCwd}`));
    }
    return node_fs_1.default.promises.readFile(p, 'utf-8');
};
exports.getFileSource = getFileSource;

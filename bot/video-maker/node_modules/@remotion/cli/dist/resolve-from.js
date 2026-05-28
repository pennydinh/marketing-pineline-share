"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveFrom = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const Module = require("module");
const resolveFrom = (fromDirectory, moduleId) => {
    try {
        fromDirectory = node_fs_1.default.realpathSync(fromDirectory);
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            fromDirectory = node_path_1.default.resolve(fromDirectory);
        }
        else {
            throw error;
        }
    }
    const fromFile = node_path_1.default.join(fromDirectory, 'noop.js');
    const resolveFileName = () => 
    // @ts-expect-error
    Module._resolveFilename(moduleId, {
        id: fromFile,
        filename: fromFile,
        // @ts-expect-error
        paths: Module._nodeModulePaths(fromDirectory),
    });
    return resolveFileName();
};
exports.resolveFrom = resolveFrom;

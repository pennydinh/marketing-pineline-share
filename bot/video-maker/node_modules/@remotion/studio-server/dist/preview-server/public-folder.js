"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFiles = exports.fetchFolder = exports.initPublicFolderWatch = void 0;
const bundler_1 = require("@remotion/bundler");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const env_supports_fs_recursive_1 = require("./env-supports-fs-recursive");
let files = [];
const initPublicFolderWatch = ({ publicDir, onUpdate, staticHash, }) => {
    (0, exports.fetchFolder)({ publicDir, staticHash });
    watchPublicFolder({ publicDir, onUpdate, staticHash });
};
exports.initPublicFolderWatch = initPublicFolderWatch;
const fetchFolder = ({ publicDir, staticHash, }) => {
    files = bundler_1.BundlerInternals.readRecursively({
        folder: '.',
        startPath: publicDir,
        staticHash,
        limit: 10000,
    }).map((f) => {
        return {
            ...f,
            name: f.name.split(node_path_1.default.sep).join('/'),
        };
    });
};
exports.fetchFolder = fetchFolder;
const watchPublicFolder = ({ publicDir, onUpdate, staticHash, }) => {
    if (!(0, node_fs_1.existsSync)(publicDir)) {
        const parentDir = node_path_1.default.dirname(publicDir);
        const onDirChange = () => {
            if ((0, node_fs_1.existsSync)(publicDir)) {
                watchPublicFolder({
                    publicDir,
                    onUpdate,
                    staticHash,
                });
                onUpdate();
                watcher.close();
            }
        };
        const watcher = (0, node_fs_1.watch)(parentDir, {}, onDirChange);
        return;
    }
    // Known bug: If whole public folder is deleted, this will not be called on macOS.
    // This is not severe, so a wontfix for now.
    (0, node_fs_1.watch)(publicDir, { recursive: (0, env_supports_fs_recursive_1.envSupportsFsRecursive)() }, () => {
        (0, exports.fetchFolder)({ publicDir, staticHash });
        onUpdate();
    });
};
const getFiles = () => {
    return files;
};
exports.getFiles = getFiles;

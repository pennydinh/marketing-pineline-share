"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDownloadsCacheDir = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const getDownloadsCacheDir = () => {
    const cwd = process.cwd();
    let dir = cwd;
    for (;;) {
        try {
            if (node_fs_1.default.statSync(node_path_1.default.join(dir, 'package.json')).isFile()) {
                break;
            }
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        const parent = node_path_1.default.dirname(dir);
        if (dir === parent) {
            dir = undefined;
            break;
        }
        dir = parent;
    }
    if (!dir) {
        return node_path_1.default.resolve(cwd, '.remotion');
    }
    if (process.versions.pnp === '1') {
        return node_path_1.default.resolve(dir, '.pnp/.remotion');
    }
    if (process.versions.pnp === '3') {
        return node_path_1.default.resolve(dir, '.yarn/.remotion');
    }
    return node_path_1.default.resolve(dir, 'node_modules/.remotion');
};
exports.getDownloadsCacheDir = getDownloadsCacheDir;

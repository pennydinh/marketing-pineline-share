"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsolutePublicDir = void 0;
const node_path_1 = __importDefault(require("node:path"));
const getAbsolutePublicDir = ({ relativePublicDir, remotionRoot, }) => {
    return relativePublicDir
        ? node_path_1.default.resolve(remotionRoot, relativePublicDir)
        : node_path_1.default.join(remotionRoot, 'public');
};
exports.getAbsolutePublicDir = getAbsolutePublicDir;

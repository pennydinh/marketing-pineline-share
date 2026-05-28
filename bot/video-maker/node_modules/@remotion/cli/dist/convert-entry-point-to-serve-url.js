"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEntryPointToServeUrl = void 0;
const renderer_1 = require("@remotion/renderer");
const node_path_1 = __importDefault(require("node:path"));
const convertEntryPointToServeUrl = (entryPoint) => {
    const fullPath = renderer_1.RenderInternals.isServeUrl(entryPoint)
        ? entryPoint
        : node_path_1.default.resolve(process.cwd(), entryPoint);
    return fullPath;
};
exports.convertEntryPointToServeUrl = convertEntryPointToServeUrl;

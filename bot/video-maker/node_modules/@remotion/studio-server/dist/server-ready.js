"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printServerReadyComment = exports.setServerReadyComment = void 0;
const renderer_1 = require("@remotion/renderer");
let message = null;
const setServerReadyComment = (newMessage) => {
    message = newMessage;
};
exports.setServerReadyComment = setServerReadyComment;
const printServerReadyComment = (prefix, logLevel) => {
    renderer_1.RenderInternals.Log.info({ indent: false, logLevel }, `${prefix} - ${message}`);
};
exports.printServerReadyComment = printServerReadyComment;

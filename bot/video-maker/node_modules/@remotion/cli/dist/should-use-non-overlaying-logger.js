"use strict";
// Should not use a logger that uses ANSI Diffing if
// - using verbose logging (intersection of Chrome + Remotion + compositor logs)
// - using a non-interactive terminal such as CI
Object.defineProperty(exports, "__esModule", { value: true });
exports.shouldUseNonOverlayingLogger = void 0;
const renderer_1 = require("@remotion/renderer");
const shouldUseNonOverlayingLogger = ({ logLevel, }) => {
    return (renderer_1.RenderInternals.isEqualOrBelowLogLevel(logLevel, 'verbose') ||
        !process.stdout.isTTY);
};
exports.shouldUseNonOverlayingLogger = shouldUseNonOverlayingLogger;

"use strict";
/**
 * A symbolicateable error is an error that can be symolicated by fetching the original sources. By throwing a symbolicateable error, Remotion CLI will attempt to symplicate it
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymbolicateableError = void 0;
const delay_render_embedded_stack_1 = require("../delay-render-embedded-stack");
class SymbolicateableError extends Error {
    constructor({ message, stack, stackFrame, frame, name, }) {
        super(message);
        this.stack = stack;
        this.stackFrame = stackFrame;
        this.frame = frame;
        this.name = name;
        this.delayRenderCall = stack ? (0, delay_render_embedded_stack_1.parseDelayRenderEmbeddedStack)(stack) : null;
    }
}
exports.SymbolicateableError = SymbolicateableError;

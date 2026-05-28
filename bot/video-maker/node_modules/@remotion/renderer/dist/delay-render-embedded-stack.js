"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDelayRenderEmbeddedStack = void 0;
const no_react_1 = require("remotion/no-react");
const parse_browser_error_stack_1 = require("./parse-browser-error-stack");
const parseDelayRenderEmbeddedStack = (message) => {
    const index = message.indexOf(no_react_1.NoReactInternals.DELAY_RENDER_CALLSTACK_TOKEN);
    if (index === -1) {
        return null;
    }
    const msg = message
        .substring(index + no_react_1.NoReactInternals.DELAY_RENDER_CALLSTACK_TOKEN.length)
        .trim();
    const parsed = (0, parse_browser_error_stack_1.parseStack)(msg.split('\n'));
    return parsed;
};
exports.parseDelayRenderEmbeddedStack = parseDelayRenderEmbeddedStack;

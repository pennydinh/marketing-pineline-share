"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delayRenderTimeoutInMillisecondsOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TimeoutSettings_1 = require("../browser/TimeoutSettings");
let currentTimeout = TimeoutSettings_1.DEFAULT_TIMEOUT;
const validate = (value) => {
    if (typeof value !== 'number') {
        throw new Error('--timeout flag / setDelayRenderTimeoutInMilliseconds() must be a number, but got ' +
            JSON.stringify(value));
    }
};
const cliFlag = 'timeout';
exports.delayRenderTimeoutInMillisecondsOption = {
    name: 'delayRender() timeout',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["A number describing how long the render may take to resolve all", ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://remotion.dev/docs/delay-render", children: (0, jsx_runtime_1.jsx)("code", { children: "delayRender()" }) }), ' ', "calls ", (0, jsx_runtime_1.jsx)("a", { href: "https://remotion.dev/docs/timeout", children: "before it times out" }), ". Default: ", (0, jsx_runtime_1.jsx)("code", { children: "30000" })] })),
    ssrName: 'timeoutInMilliseconds',
    docLink: 'https://www.remotion.dev/docs/timeout',
    type: 0,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (currentTimeout !== null) {
            validate(currentTimeout);
            return {
                source: 'config',
                value: currentTimeout,
            };
        }
        return {
            source: 'default',
            value: TimeoutSettings_1.DEFAULT_TIMEOUT,
        };
    },
    setConfig: (value) => {
        validate(value);
        currentTimeout = value;
    },
};

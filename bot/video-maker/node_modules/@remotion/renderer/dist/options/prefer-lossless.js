"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferLosslessAudioOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'prefer-lossless';
let input = false;
exports.preferLosslessAudioOption = {
    name: 'Prefer lossless',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Uses a lossless audio codec, if one is available for the codec. If you set", (0, jsx_runtime_1.jsx)("code", { children: "audioCodec" }), ", it takes priority over", ' ', (0, jsx_runtime_1.jsx)("code", { children: "preferLossless" }), "."] })),
    docLink: 'https://www.remotion.dev/docs/encoding',
    type: false,
    ssrName: 'preferLossless',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag]) {
            return { value: true, source: 'cli' };
        }
        if (input === true) {
            return { value: true, source: 'config' };
        }
        return { value: false, source: 'default' };
    },
    setConfig: (val) => {
        input = val;
    },
};

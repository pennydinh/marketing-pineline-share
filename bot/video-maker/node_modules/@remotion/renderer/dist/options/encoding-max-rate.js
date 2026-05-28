"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodingMaxRateOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let encodingMaxRate = null;
const cliFlag = 'max-rate';
exports.encodingMaxRateOption = {
    name: 'FFmpeg -maxrate flag',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["The value for the ", (0, jsx_runtime_1.jsx)("code", { children: "-maxrate" }), " flag of FFmpeg. Should be used in conjunction with the encoding buffer size flag."] })),
    ssrName: 'encodingMaxRate',
    docLink: 'https://www.remotion.dev/docs/renderer/render-media#encodingmaxrate',
    type: '',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (encodingMaxRate !== null) {
            return {
                value: encodingMaxRate,
                source: 'config',
            };
        }
        return {
            value: null,
            source: 'default',
        };
    },
    setConfig: (newMaxRate) => {
        encodingMaxRate = newMaxRate;
    },
};

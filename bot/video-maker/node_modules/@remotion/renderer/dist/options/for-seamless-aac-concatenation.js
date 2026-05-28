"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forSeamlessAacConcatenationOption = exports.getForSeamlessAacConcatenation = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const DEFAULT = false;
let forSeamlessAacConcatenation = DEFAULT;
const getForSeamlessAacConcatenation = () => {
    return forSeamlessAacConcatenation;
};
exports.getForSeamlessAacConcatenation = getForSeamlessAacConcatenation;
const cliFlag = 'for-seamless-aac-concatenation';
exports.forSeamlessAacConcatenationOption = {
    name: 'For seamless AAC concatenation',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["If enabled, the audio is trimmed to the nearest AAC frame, which is required for seamless concatenation of AAC files. This is a requirement if you later want to combine multiple video snippets seamlessly.", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("br", {}), " This option is used internally. There is currently no documentation yet for to concatenate the audio chunks."] })),
    docLink: 'https://remotion.dev/docs/renderer',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag]) {
            return {
                source: 'cli',
                value: true,
            };
        }
        if (forSeamlessAacConcatenation !== DEFAULT) {
            return {
                source: 'config',
                value: forSeamlessAacConcatenation,
            };
        }
        return {
            source: 'default',
            value: DEFAULT,
        };
    },
    setConfig: (value) => {
        forSeamlessAacConcatenation = value;
    },
    ssrName: 'forSeamlessAacConcatenation',
    type: false,
};

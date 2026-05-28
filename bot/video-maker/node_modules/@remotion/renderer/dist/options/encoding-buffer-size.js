"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodingBufferSizeOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * encodingBufferSize is not a bitrate, but it is a bitrate-related option and get validated like a bitrate.
 */
let encodingBufferSize = null;
const setEncodingBufferSize = (bitrate) => {
    encodingBufferSize = bitrate;
};
const cliFlag = 'buffer-size';
exports.encodingBufferSizeOption = {
    name: 'FFmpeg -bufsize flag',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["The value for the ", (0, jsx_runtime_1.jsx)("code", { children: "-bufsize" }), " flag of FFmpeg. Should be used in conjunction with the encoding max rate flag."] })),
    ssrName: 'encodingBufferSize',
    docLink: 'https://www.remotion.dev/docs/renderer/render-media#encodingbuffersize',
    type: '',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (encodingBufferSize !== null) {
            return {
                value: encodingBufferSize,
                source: 'config',
            };
        }
        return {
            value: null,
            source: 'default',
        };
    },
    setConfig: setEncodingBufferSize,
};

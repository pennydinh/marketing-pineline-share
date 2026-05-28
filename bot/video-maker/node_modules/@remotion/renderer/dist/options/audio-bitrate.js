"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioBitrateOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'audio-bitrate';
let audioBitrate = null;
exports.audioBitrateOption = {
    name: 'Audio Bitrate',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Specify the target bitrate for the generated video. The syntax for FFmpeg", "'", "s ", (0, jsx_runtime_1.jsx)("code", { children: "-b:a" }), " parameter should be used. FFmpeg may encode the video in a way that will not result in the exact audio bitrate specified. Example values: ", (0, jsx_runtime_1.jsx)("code", { children: "512K" }), " for 512 kbps, ", (0, jsx_runtime_1.jsx)("code", { children: "1M" }), " for 1 Mbps. Default: ", (0, jsx_runtime_1.jsx)("code", { children: "320k" })] })),
    ssrName: 'audioBitrate',
    docLink: 'https://www.remotion.dev/docs/renderer/render-media#audiobitrate-',
    type: '0',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag]) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (audioBitrate) {
            return {
                value: audioBitrate,
                source: 'config file',
            };
        }
        return {
            value: null,
            source: 'default',
        };
    },
    setConfig: (value) => {
        audioBitrate = value;
    },
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onBrowserDownloadOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'on-browser-download';
exports.onBrowserDownloadOption = {
    name: 'Browser download callback function',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Gets called when no compatible local browser is detected on the system and this API needs to download a browser. Return a callback to observe progress.", ' ', (0, jsx_runtime_1.jsx)("a", { href: "/docs/renderer/ensure-browser#onbrowserdownload", children: "See here for how to use this option." })] })),
    ssrName: 'onBrowserDownload',
    docLink: 'https://www.remotion.dev/docs/renderer/ensure-browser',
    type: undefined,
    getValue: () => {
        throw new Error('does not support config file');
    },
    setConfig: () => {
        throw new Error('does not support config file');
    },
};

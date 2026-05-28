"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderExpiryOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let enableFolderExpiry = null;
const cliFlag = 'enable-folder-expiry';
exports.folderExpiryOption = {
    name: 'Lambda render expiration',
    cliFlag,
    description: () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["When deploying sites, enable or disable S3 Lifecycle policies which allow for renders to auto-delete after a certain time. Default is", ' ', (0, jsx_runtime_1.jsx)("code", { children: "null" }), ", which does not change any lifecycle policies of the S3 bucket. See: ", (0, jsx_runtime_1.jsx)("a", { href: "/docs/lambda/autodelete", children: "Lambda autodelete" }), "."] }));
    },
    ssrName: 'enableFolderExpiry',
    docLink: 'https://www.remotion.dev/docs/lambda/autodelete',
    type: false,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (enableFolderExpiry !== null) {
            return {
                source: 'config',
                value: enableFolderExpiry,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (value) => {
        enableFolderExpiry = value;
    },
};

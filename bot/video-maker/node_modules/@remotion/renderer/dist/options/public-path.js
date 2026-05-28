"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicPathOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'public-path';
let currentPublicPath = null;
exports.publicPathOption = {
    name: 'Public Path',
    cliFlag,
    description: () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["The path of the URL where the bundle is going to be hosted. By default it is ", (0, jsx_runtime_1.jsx)("code", { children: "/" }), ", meaning that the bundle is going to be hosted at the root of the domain (e.g. ", (0, jsx_runtime_1.jsx)("code", { children: "https://localhost:3000/" }), "). If you are deploying to a subdirectory (e.g. ", (0, jsx_runtime_1.jsx)("code", { children: "/sites/my-site/" }), "), you should set this to the subdirectory."] }));
    },
    ssrName: 'publicPath',
    docLink: 'https://www.remotion.dev/docs/renderer',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (currentPublicPath !== null) {
            return {
                source: 'config',
                value: currentPublicPath,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (value) => {
        currentPublicPath = value;
    },
    type: '',
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicDirOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'public-dir';
let currentPublicDir = null;
exports.publicDirOption = {
    name: 'Public Directory',
    cliFlag,
    description: () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Define the location of the", ' ', (0, jsx_runtime_1.jsx)("a", { href: "/docs/terminology/public-dir", children: (0, jsx_runtime_1.jsx)("code", { children: "public/ directory" }) }), ". If not defined, Remotion will assume the location is the `public` folder in your Remotion root."] }));
    },
    ssrName: 'publicDir',
    docLink: 'https://www.remotion.dev/docs/terminology/public-dir',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (currentPublicDir !== null) {
            return {
                source: 'config',
                value: currentPublicDir,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (value) => {
        currentPublicDir = value;
    },
    type: '',
};

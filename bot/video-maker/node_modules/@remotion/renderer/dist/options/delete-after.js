"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAfterOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'delete-after';
let deleteAfter = null;
exports.deleteAfterOption = {
    name: 'Lambda render expiration',
    cliFlag,
    description: () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Automatically delete the render after a certain period. Accepted values are ", (0, jsx_runtime_1.jsx)("code", { children: "1-day" }), ", ", (0, jsx_runtime_1.jsx)("code", { children: "3-days" }), ", ", (0, jsx_runtime_1.jsx)("code", { children: "7-days" }), " and", ' ', (0, jsx_runtime_1.jsx)("code", { children: "30-days" }), ".", (0, jsx_runtime_1.jsx)("br", {}), " For this to work, your bucket needs to have", ' ', (0, jsx_runtime_1.jsx)("a", { href: "/docs/lambda/autodelete", children: "lifecycles enabled" }), "."] }));
    },
    ssrName: 'deleteAfter',
    docLink: 'https://www.remotion.dev/docs/lambda/autodelete',
    type: '1-day',
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (deleteAfter !== null) {
            return {
                source: 'config',
                value: deleteAfter,
            };
        }
        return {
            source: 'default',
            value: null,
        };
    },
    setConfig: (value) => {
        deleteAfter = value;
    },
};

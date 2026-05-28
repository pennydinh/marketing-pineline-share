"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.overwriteOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let shouldOverwrite = null;
const cliFlag = 'overwrite';
const validate = (value) => {
    if (typeof value !== 'boolean') {
        throw new Error(`overwriteExisting must be a boolean but got ${typeof value} (${value})`);
    }
};
exports.overwriteOption = {
    name: 'Overwrite output',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["If set to ", (0, jsx_runtime_1.jsx)("code", { children: "false" }), ", will prevent rendering to a path that already exists. Default is ", (0, jsx_runtime_1.jsx)("code", { children: "true" }), "."] })),
    ssrName: 'overwrite',
    docLink: 'https://www.remotion.dev/docs/config#setoverwriteoutput',
    type: false,
    getValue: ({ commandLine }, defaultValue) => {
        if (commandLine[cliFlag] !== undefined) {
            validate(commandLine[cliFlag]);
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (shouldOverwrite !== null) {
            return {
                source: 'config',
                value: shouldOverwrite,
            };
        }
        return {
            source: 'default',
            value: defaultValue,
        };
    },
    setConfig: (value) => {
        validate(value);
        shouldOverwrite = value;
    },
};

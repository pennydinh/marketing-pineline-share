"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reproOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let enableRepro = false;
const setRepro = (should) => {
    enableRepro = should;
};
const cliFlag = 'repro';
exports.reproOption = {
    name: 'Create reproduction',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Create a ZIP that you can submit to Remotion if asked for a reproduction." })),
    ssrName: 'repro',
    docLink: 'https://www.remotion.dev/docs/render-media#repro',
    type: false,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (enableRepro) {
            return {
                value: enableRepro,
                source: 'config',
            };
        }
        return {
            value: false,
            source: 'default',
        };
    },
    setConfig: setRepro,
};

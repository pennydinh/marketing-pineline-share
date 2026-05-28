"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beepOnFinishOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let beepOnFinish = false;
const cliFlag = 'beep-on-finish';
exports.beepOnFinishOption = {
    name: 'Beep on finish',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "Whether the Remotion Studio tab should beep when the render is finished." })),
    ssrName: null,
    docLink: 'https://www.remotion.dev/docs/config#setbeeponfinish',
    type: false,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (beepOnFinish !== false) {
            return {
                value: beepOnFinish,
                source: 'config',
            };
        }
        return {
            value: false,
            source: 'default',
        };
    },
    setConfig(value) {
        beepOnFinish = value;
    },
};

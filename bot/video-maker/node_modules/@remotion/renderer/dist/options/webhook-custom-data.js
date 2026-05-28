"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookCustomDataOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'webhook-custom-data';
exports.webhookCustomDataOption = {
    name: 'Webhook custom data',
    cliFlag,
    description: (type) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Pass up to 1,024 bytes of a JSON-serializable object to the webhook. This data will be included in the webhook payload.", ' ', type === 'cli'
                ? 'Alternatively, pass a file path pointing to a JSON file'
                : null] })),
    ssrName: 'customData',
    docLink: 'https://www.remotion.dev/docs/lambda/webhooks',
    type: {},
    getValue: () => {
        throw new Error('Option resolution not implemented');
    },
    setConfig: () => {
        throw new Error('Not implemented');
    },
};

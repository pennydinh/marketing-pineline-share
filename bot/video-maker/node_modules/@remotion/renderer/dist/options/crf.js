"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crfOption = exports.validateCrf = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let currentCrf;
const validateCrf = (newCrf) => {
    if (typeof newCrf !== 'number' && newCrf !== undefined) {
        throw new TypeError('The CRF must be a number or undefined.');
    }
};
exports.validateCrf = validateCrf;
const cliFlag = 'crf';
exports.crfOption = {
    name: 'CRF',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: "No matter which codec you end up using, there's always a tradeoff between file size and video quality. You can control it by setting the CRF (Constant Rate Factor). The lower the number, the better the quality, the higher the number, the smaller the file is \u2013 of course at the cost of quality." })),
    ssrName: 'crf',
    docLink: 'https://www.remotion.dev/docs/encoding/#controlling-quality-using-the-crf-setting',
    type: 0,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            (0, exports.validateCrf)(commandLine[cliFlag]);
            return {
                source: 'cli',
                value: commandLine[cliFlag],
            };
        }
        if (currentCrf !== null) {
            return {
                source: 'config',
                value: currentCrf,
            };
        }
        return {
            source: 'default',
            value: undefined,
        };
    },
    setConfig: (crf) => {
        (0, exports.validateCrf)(crf);
        currentCrf = crf;
    },
};

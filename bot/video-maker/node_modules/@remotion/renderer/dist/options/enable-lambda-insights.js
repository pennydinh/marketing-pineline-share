"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLambdaInsights = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const cliFlag = 'enable-lambda-insights';
let option = false;
exports.enableLambdaInsights = {
    name: 'Enable Lambda Insights',
    cliFlag,
    description: () => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Enable", ' ', (0, jsx_runtime_1.jsx)("a", { href: "https://remotion.dev/docs/lambda/insights", children: "Lambda Insights in AWS CloudWatch" }), ". For this to work, you may have to update your role permission."] })),
    ssrName: 'enableLambdaInsights',
    docLink: 'https://www.remotion.dev/docs/lambda/insights',
    type: false,
    setConfig: (value) => {
        option = value;
    },
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (option) {
            return {
                value: option,
                source: 'config',
            };
        }
        return {
            value: false,
            source: 'default',
        };
    },
};

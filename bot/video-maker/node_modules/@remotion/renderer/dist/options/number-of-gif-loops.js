"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numberOfGifLoopsOption = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
let currentLoop = null;
const validate = (newLoop) => {
    if (newLoop !== null && typeof newLoop !== 'number') {
        throw new Error('--number-of-gif-loops flag must be a number.');
    }
};
const cliFlag = 'number-of-gif-loops';
exports.numberOfGifLoopsOption = {
    name: 'Number of GIF loops',
    cliFlag,
    description: () => {
        return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: ["Allows you to set the number of loops as follows:", (0, jsx_runtime_1.jsxs)("ul", { children: [(0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("code", { children: "null" }), " (or omitting in the CLI) plays the GIF indefinitely."] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("code", { children: "0" }), " disables looping"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("code", { children: "1" }), " loops the GIF once (plays twice in total)"] }), (0, jsx_runtime_1.jsxs)("li", { children: [(0, jsx_runtime_1.jsx)("code", { children: "2" }), " loops the GIF twice (plays three times in total) and so on."] })] })] }));
    },
    ssrName: 'numberOfGifLoops',
    docLink: 'https://www.remotion.dev/docs/render-as-gif#changing-the-number-of-loops',
    type: 0,
    getValue: ({ commandLine }) => {
        if (commandLine[cliFlag] !== undefined) {
            validate(commandLine[cliFlag]);
            return {
                value: commandLine[cliFlag],
                source: 'cli',
            };
        }
        if (currentLoop !== null) {
            return {
                value: currentLoop,
                source: 'config',
            };
        }
        return {
            value: null,
            source: 'default',
        };
    },
    setConfig: (newLoop) => {
        validate(newLoop);
        currentLoop = newLoop;
    },
};

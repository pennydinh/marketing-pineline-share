"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickSwitcherNoResults = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const colors_1 = require("../../helpers/colors");
const container = {
    padding: 80,
    color: colors_1.LIGHT_TEXT,
    textAlign: 'center',
    fontSize: 14,
};
const MODE_TO_STRING = {
    commands: 'commands',
    compositions: 'compositions',
    docs: 'documentation',
};
const QuickSwitcherNoResults = ({ query, mode }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: ["No ", MODE_TO_STRING[mode], " matching ", '"', query, '"'] }));
};
exports.QuickSwitcherNoResults = QuickSwitcherNoResults;

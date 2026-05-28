"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const DismissableModal_1 = require("../NewComposition/DismissableModal");
const QuickSwitcherContent_1 = require("./QuickSwitcherContent");
const QuickSwitcher = ({ initialMode, invocationTimestamp, readOnlyStudio }) => {
    return ((0, jsx_runtime_1.jsx)(DismissableModal_1.DismissableModal, { children: (0, jsx_runtime_1.jsx)(QuickSwitcherContent_1.QuickSwitcherContent, { readOnlyStudio: readOnlyStudio, invocationTimestamp: invocationTimestamp, initialMode: initialMode }) }));
};
exports.default = QuickSwitcher;

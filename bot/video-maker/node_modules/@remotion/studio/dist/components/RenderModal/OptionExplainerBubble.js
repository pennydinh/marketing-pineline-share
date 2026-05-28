"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionExplainerBubble = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@remotion/renderer/client");
const InfoBubble_1 = require("./InfoBubble");
const OptionExplainer_1 = require("./OptionExplainer");
const OptionExplainerBubble = ({ id }) => {
    const option = client_1.BrowserSafeApis.options[id];
    return ((0, jsx_runtime_1.jsx)(InfoBubble_1.InfoBubble, { title: "Learn more about this option", children: (0, jsx_runtime_1.jsx)(OptionExplainer_1.OptionExplainer, { option: option }) }));
};
exports.OptionExplainerBubble = OptionExplainerBubble;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateMetadataErrorExplainer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const styles_1 = require("../../components/Menu/styles");
const colors_1 = require("../../helpers/colors");
const CalculateMetadataErrorExplainer = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: style, children: ["This error occured while calling", ' ', (0, jsx_runtime_1.jsx)("code", { style: styles_1.inlineCodeSnippet, children: "calculateMetadata()" }), "."] }));
};
exports.CalculateMetadataErrorExplainer = CalculateMetadataErrorExplainer;
const style = {
    borderRadius: 3,
    color: 'white',
    padding: 12,
    backgroundColor: colors_1.BORDER_COLOR,
    fontSize: 14,
    fontFamily: 'sans-serif',
};

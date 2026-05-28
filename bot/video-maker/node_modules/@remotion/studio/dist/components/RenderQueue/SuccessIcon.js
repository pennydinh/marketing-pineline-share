"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessIcon = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const colors_1 = require("../../helpers/colors");
const CircularProgress_1 = require("./CircularProgress");
const iconStyle = {
    height: CircularProgress_1.RENDER_STATUS_INDICATOR_SIZE,
    width: CircularProgress_1.RENDER_STATUS_INDICATOR_SIZE,
};
const SuccessIcon = () => {
    return ((0, jsx_runtime_1.jsx)("svg", { style: iconStyle, viewBox: "0 0 512 512", children: (0, jsx_runtime_1.jsx)("path", { fill: colors_1.LIGHT_TEXT, d: "M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337l-17 17-17-17-64-64-17-17L160 222.1l17 17 47 47L335 175l17-17L385.9 192l-17 17z" }) }));
};
exports.SuccessIcon = SuccessIcon;

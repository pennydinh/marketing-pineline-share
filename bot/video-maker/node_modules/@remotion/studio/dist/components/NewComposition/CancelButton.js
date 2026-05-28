"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const z_index_1 = require("../../state/z-index");
const style = {
    appearance: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    color: 'white',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const CancelButton = ({ onPress, ...props }) => {
    const { tabIndex } = (0, z_index_1.useZIndex)();
    return ((0, jsx_runtime_1.jsx)("button", { tabIndex: tabIndex, style: style, type: "button", onClick: onPress, children: (0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 320 512", ...props, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z" }) }) }));
};
exports.CancelButton = CancelButton;

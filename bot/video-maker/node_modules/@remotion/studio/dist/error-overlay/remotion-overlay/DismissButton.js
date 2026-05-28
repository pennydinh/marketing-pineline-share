"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DismissButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const url_state_1 = require("../../helpers/url-state");
const size = {
    height: 20,
    width: 20,
};
const style = {
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
};
const DismissButton = () => {
    const dismiss = (0, react_1.useCallback)(() => {
        (0, url_state_1.clearUrl)();
    }, []);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", style: style, onClick: dismiss, children: (0, jsx_runtime_1.jsx)("svg", { focusable: "false", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 352 512", style: size, children: (0, jsx_runtime_1.jsx)("path", { fill: "white", d: "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" }) }) }));
};
exports.DismissButton = DismissButton;

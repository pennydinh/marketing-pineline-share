"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorDot = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const container = {
    height: 16,
    width: 16,
    backgroundColor: 'red',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
};
const ColorDot = ({ color }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            ...container,
            backgroundColor: color,
        };
    }, [color]);
    return (0, jsx_runtime_1.jsx)("div", { style: style });
};
exports.ColorDot = ColorDot;

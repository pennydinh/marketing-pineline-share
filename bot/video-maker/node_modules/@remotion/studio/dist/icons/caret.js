"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AngleDown = exports.CaretDown = exports.CaretRight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const caret = {
    height: 12,
};
const caretDown = {
    width: 10,
};
const angleDown = {
    width: 10,
};
const CaretRight = () => ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 192 512", style: caret, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" }) }));
exports.CaretRight = CaretRight;
const CaretDown = () => {
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 320 512", style: caretDown, children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" }) }));
};
exports.CaretDown = CaretDown;
const AngleDown = ({ down }) => {
    const style = (0, react_1.useMemo)(() => {
        return {
            ...angleDown,
            transform: down ? 'rotate(180deg)' : 'rotate(0deg)',
            marginTop: 1,
        };
    }, [down]);
    return ((0, jsx_runtime_1.jsx)("svg", { style: style, viewBox: "0 0 448 512", children: (0, jsx_runtime_1.jsx)("path", { fill: colors_1.LIGHT_TEXT, d: "M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" }) }));
};
exports.AngleDown = AngleDown;

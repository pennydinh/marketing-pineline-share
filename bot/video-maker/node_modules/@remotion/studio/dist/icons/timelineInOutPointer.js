"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineOutPointer = exports.TimelineInPointer = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const TimelineInPointer = (props) => {
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 256 256", fill: "none", ...props, children: (0, jsx_runtime_1.jsx)("path", { d: "M158 25H99V230.5H158", stroke: props.color, strokeWidth: "42", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};
exports.TimelineInPointer = TimelineInPointer;
const TimelineOutPointer = (props) => {
    return ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 256 256", fill: "none", ...props, children: (0, jsx_runtime_1.jsx)("path", { d: "M98 25H157V230.5H98", stroke: props.color, strokeWidth: "42", strokeLinecap: "round", strokeLinejoin: "round" }) }));
};
exports.TimelineOutPointer = TimelineOutPointer;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineSliderHandle = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const container = {
    width: 20,
    height: 20,
    position: 'fixed',
    marginLeft: -8,
};
const TimelineSliderHandle = () => {
    return ((0, jsx_runtime_1.jsx)("div", { style: container, children: (0, jsx_runtime_1.jsx)("svg", { width: 17, viewBox: "0 0 159 212", children: (0, jsx_runtime_1.jsx)("path", { d: "M17.0234375,1.07763419 L143.355469,1.07763419 C151.63974,1.07763419 158.355469,7.79336295 158.355469,16.0776342 L158.355469,69.390507 C158.355469,73.7938677 156.420655,77.9748242 153.064021,80.8248415 L89.3980057,134.881757 C83.7986799,139.635978 75.5802263,139.635978 69.9809005,134.881757 L6.66764807,81.1243622 C3.0872392,78.0843437 1.0234375,73.6246568 1.0234375,68.9277387 L1.0234375,17.0776342 C1.0234375,8.2410782 8.1868815,1.07763419 17.0234375,1.07763419 Z", fill: "#f02c00" }) }) }));
};
exports.TimelineSliderHandle = TimelineSliderHandle;

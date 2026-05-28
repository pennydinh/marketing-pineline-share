"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberOfLoopsSetting = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const InputDragger_1 = require("../NewComposition/InputDragger");
const RemInput_1 = require("../NewComposition/RemInput");
const layout_1 = require("./layout");
const min = 0;
const NumberOfLoopsSetting = ({ numberOfGifLoops, setNumberOfGifLoops }) => {
    const onNumberOfGifLoopsChangedDirectly = (0, react_1.useCallback)((newConcurrency) => {
        setNumberOfGifLoops(newConcurrency);
    }, [setNumberOfGifLoops]);
    const onNumberOfGifLoopsChanged = (0, react_1.useCallback)((e) => {
        setNumberOfGifLoops((q) => {
            const newConcurrency = parseInt(e, 10);
            if (Number.isNaN(newConcurrency)) {
                return q;
            }
            const newConcurrencyClamped = Math.max(newConcurrency, min);
            return newConcurrencyClamped;
        });
    }, [setNumberOfGifLoops]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: layout_1.optionRow, children: [(0, jsx_runtime_1.jsx)("div", { style: layout_1.label, children: "Number of loops" }), (0, jsx_runtime_1.jsx)("div", { style: layout_1.rightRow, children: (0, jsx_runtime_1.jsx)(RemInput_1.RightAlignInput, { children: (0, jsx_runtime_1.jsx)(InputDragger_1.InputDragger, { value: numberOfGifLoops, onTextChange: onNumberOfGifLoopsChanged, placeholder: `${min}-`, onValueChange: onNumberOfGifLoopsChangedDirectly, name: "number-of-gif-loops", step: 1, min: min, status: "ok", rightAlign: true }) }) })] }));
};
exports.NumberOfLoopsSetting = NumberOfLoopsSetting;

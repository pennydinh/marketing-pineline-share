"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRangeSlider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const container = {
    borderColor: 'black',
    borderStyle: 'solid',
    borderWidth: '2px',
    height: 39,
    width: 220,
    position: 'relative',
    backgroundColor: colors_1.INPUT_BACKGROUND,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 2,
};
// blue slider
const sliderRange = {
    position: 'absolute',
    top: 0,
    backgroundColor: colors_1.BLUE,
    height: 35,
};
const MultiRangeSlider = ({ min, max, start, end, step, onLeftThumbDrag, onRightThumbDrag, }) => {
    const getPercent = (0, react_1.useCallback)((value) => Math.round(((value - min) / (max - min)) * 100), [min, max]);
    const rangeStyle = (0, react_1.useMemo)(() => {
        const minPercent = getPercent(start);
        const maxPercent = getPercent(end);
        return {
            ...sliderRange,
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
        };
    }, [end, getPercent, start]);
    const onChangeLeft = (0, react_1.useCallback)((event) => {
        const value = Math.min(Number(event.target.value), end - 1);
        onLeftThumbDrag(value);
    }, [end, onLeftThumbDrag]);
    const onChangeRight = (0, react_1.useCallback)((event) => {
        const value = Math.max(Number(event.target.value), start + 1);
        onRightThumbDrag(value);
    }, [onRightThumbDrag, start]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("input", { type: "range", min: min, max: max, value: start, step: step, onChange: onChangeLeft, className: "__remotion_thumb" }), (0, jsx_runtime_1.jsx)("input", { type: "range", min: min, max: max, value: end, step: step, onChange: onChangeRight, className: "__remotion_thumb" }), (0, jsx_runtime_1.jsx)("div", { style: rangeStyle })] }));
};
exports.MultiRangeSlider = MultiRangeSlider;

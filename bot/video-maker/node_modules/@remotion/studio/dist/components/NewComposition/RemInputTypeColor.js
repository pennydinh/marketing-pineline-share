"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemInputTypeColor = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const z_index_1 = require("../../state/z-index");
const RemInput_1 = require("./RemInput");
const inputBaseStyle = {
    padding: 0,
    borderStyle: 'solid',
    borderWidth: 1,
};
const RemInputTypeColorForwardRef = ({ status, ...props }, ref) => {
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const style = (0, react_1.useMemo)(() => {
        var _a;
        return {
            backgroundColor: colors_1.INPUT_BACKGROUND,
            ...inputBaseStyle,
            borderColor: (0, RemInput_1.getInputBorderColor)({ isFocused, isHovered, status }),
            ...((_a = props.style) !== null && _a !== void 0 ? _a : {}),
        };
    }, [isFocused, isHovered, props.style, status]);
    (0, react_1.useImperativeHandle)(ref, () => {
        return inputRef.current;
    }, []);
    (0, react_1.useEffect)(() => {
        if (!inputRef.current) {
            return;
        }
        const { current } = inputRef;
        const onFocus = () => setIsFocused(true);
        const onBlur = () => setIsFocused(false);
        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);
        current.addEventListener('focus', onFocus);
        current.addEventListener('blur', onBlur);
        current.addEventListener('mouseenter', onMouseEnter);
        current.addEventListener('mouseleave', onMouseLeave);
        return () => {
            current.removeEventListener('focus', onFocus);
            current.removeEventListener('blur', onBlur);
            current.removeEventListener('mouseenter', onMouseEnter);
            current.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [inputRef]);
    return ((0, jsx_runtime_1.jsx)("input", { ref: inputRef, type: "color", tabIndex: tabIndex, ...props, name: props.name, style: style }));
};
exports.RemInputTypeColor = (0, react_1.forwardRef)(RemInputTypeColorForwardRef);

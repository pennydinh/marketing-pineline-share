"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemTextarea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const z_index_1 = require("../../state/z-index");
const is_menu_item_1 = require("../Menu/is-menu-item");
const RemInput_1 = require("../NewComposition/RemInput");
const inputBaseStyle = {
    padding: `${RemInput_1.INPUT_HORIZONTAL_PADDING}px 10px`,
    color: 'white',
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 14,
    resize: 'none',
    overflowX: 'hidden',
};
const RemTextareaFRFunction = ({ status, ...props }, ref) => {
    const [isFocused, setIsFocused] = (0, react_1.useState)(false);
    const [isHovered, setIsHovered] = (0, react_1.useState)(false);
    const inputRef = (0, react_1.useRef)(null);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    (0, react_1.useImperativeHandle)(ref, () => {
        return inputRef.current;
    }, []);
    const style = (0, react_1.useMemo)(() => {
        var _a;
        return {
            backgroundColor: colors_1.INPUT_BACKGROUND,
            ...inputBaseStyle,
            width: '100%',
            borderColor: (0, RemInput_1.getInputBorderColor)({ isFocused, isHovered, status }),
            ...((_a = props.style) !== null && _a !== void 0 ? _a : {}),
        };
    }, [isFocused, isHovered, props.style, status]);
    (0, react_1.useEffect)(() => {
        if (!inputRef.current) {
            return;
        }
        const { current } = inputRef;
        const onFocus = () => setIsFocused(true);
        const onBlur = () => setIsFocused(false);
        const onMouseEnter = () => setIsHovered(true);
        const onMouseLeave = () => setIsHovered(false);
        const onKeyDown = (e) => {
            if (!inputRef.current) {
                return;
            }
            if (inputRef.current !== document.activeElement) {
                return;
            }
            if (e.code === 'Tab') {
                e.preventDefault();
                // Always match up with value in JSON.stringify(content, null, 2)
                document.execCommand('insertText', false, ' '.repeat(2));
            }
            if (e.code === 'Enter') {
                e.preventDefault();
                const { selectionStart, selectionEnd, value } = inputRef.current;
                if (selectionStart !== selectionEnd) {
                    return;
                }
                let prevNewline = selectionStart;
                for (let i = selectionStart - 1; i >= 0; i--) {
                    if (value[i] === '\n') {
                        break;
                    }
                    prevNewline = i;
                }
                const currentLine = value.substring(prevNewline, selectionStart);
                const trimmed = currentLine.trim();
                const difference = currentLine.length - trimmed.length;
                document.execCommand('insertText', false, '\n' + ' '.repeat(difference));
            }
        };
        current.addEventListener('focus', onFocus);
        current.addEventListener('blur', onBlur);
        current.addEventListener('mouseenter', onMouseEnter);
        current.addEventListener('mouseleave', onMouseLeave);
        current.addEventListener('keydown', onKeyDown);
        return () => {
            current.removeEventListener('focus', onFocus);
            current.removeEventListener('blur', onBlur);
            current.removeEventListener('mouseenter', onMouseEnter);
            current.removeEventListener('mouseleave', onMouseLeave);
            current.removeEventListener('keydown', onKeyDown);
        };
    }, [inputRef]);
    return ((0, jsx_runtime_1.jsx)("textarea", { ref: inputRef, tabIndex: tabIndex, ...props, className: is_menu_item_1.VERTICAL_SCROLLBAR_CLASSNAME, style: style }));
};
exports.RemTextarea = (0, react_1.forwardRef)(RemTextareaFRFunction);

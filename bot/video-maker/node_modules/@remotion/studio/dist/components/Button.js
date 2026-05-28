"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const button = {
    border: `1px solid ${colors_1.INPUT_BORDER_COLOR_UNHOVERED}`,
    borderRadius: 4,
    backgroundColor: colors_1.INPUT_BACKGROUND,
    appearance: 'none',
    fontFamily: 'inherit',
    fontSize: 14,
    color: 'white',
    flexDirection: 'row',
};
const ButtonRefForwardFunction = ({ children, onClick, title, disabled, style, id, autoFocus, buttonContainerStyle, }, ref) => {
    const combined = (0, react_1.useMemo)(() => {
        return {
            ...button,
            ...(style !== null && style !== void 0 ? style : {}),
        };
    }, [style]);
    const buttonContainer = (0, react_1.useMemo)(() => {
        return {
            padding: 10,
            cursor: disabled ? 'inherit' : 'pointer',
            fontSize: 14,
            opacity: disabled ? 0.7 : 1,
            ...(buttonContainerStyle !== null && buttonContainerStyle !== void 0 ? buttonContainerStyle : {}),
        };
    }, [buttonContainerStyle, disabled]);
    return ((0, jsx_runtime_1.jsx)("button", { ref: ref, id: id, style: combined, type: "button", disabled: disabled, onClick: onClick, autoFocus: autoFocus, title: title, children: (0, jsx_runtime_1.jsx)("div", { className: "css-reset", style: buttonContainer, children: children }) }));
};
exports.Button = (0, react_1.forwardRef)(ButtonRefForwardFunction);

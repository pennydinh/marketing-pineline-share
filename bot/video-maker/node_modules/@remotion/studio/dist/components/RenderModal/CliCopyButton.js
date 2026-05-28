"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCopyButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const clipboard_1 = require("../../icons/clipboard");
const svgStyle = {
    width: 16,
    height: 16,
    verticalAlign: 'sub',
};
const copiedStyle = {
    fontSize: '14px',
    minHeight: '30px',
    minWidth: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const buttonStyle = {
    width: '30px',
    height: '30px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const CliCopyButton = ({ valueToCopy, }) => {
    const [copied, setCopied] = (0, react_1.useState)(false);
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const fillColor = (0, react_1.useMemo)(() => {
        return hovered ? 'white' : colors_1.LIGHT_TEXT;
    }, [hovered]);
    const clipboardIcon = (0, jsx_runtime_1.jsx)(clipboard_1.ClipboardIcon, { color: fillColor, style: svgStyle });
    const checkSvg = ((0, jsx_runtime_1.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 448 512", style: svgStyle, children: (0, jsx_runtime_1.jsx)("path", { fill: fillColor, d: "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" }) }));
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    (0, react_1.useEffect)(() => {
        if (!copied) {
            return;
        }
        const handleClear = () => {
            setCopied(false);
            setHovered(false);
        };
        const to = setTimeout(() => handleClear(), 2000);
        return () => clearTimeout(to);
    }, [copied]);
    return copied ? ((0, jsx_runtime_1.jsx)("span", { style: copiedStyle, children: checkSvg })) : ((0, jsx_runtime_1.jsx)("button", { type: "button", onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, style: buttonStyle, onClick: () => {
            navigator.clipboard.writeText(valueToCopy);
            setCopied(true);
        }, children: clipboardIcon }));
};
exports.CliCopyButton = CliCopyButton;

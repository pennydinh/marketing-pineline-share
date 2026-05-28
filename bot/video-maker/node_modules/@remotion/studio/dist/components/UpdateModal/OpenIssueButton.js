"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenIssueButton = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const svgStyle = {
    width: '11px',
    height: '11px',
};
const buttonStyle = {
    border: 'none',
    width: '24px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
const OpenIssueButton = ({ link }) => {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const buttonTooltip = `Open GitHub issue in new Tab`;
    const handleClick = (0, react_1.useCallback)(() => {
        window.open(link, '_blank');
    }, [link]);
    const svgFillColor = (0, react_1.useMemo)(() => {
        return hovered ? 'white' : colors_1.LIGHT_TEXT;
    }, [hovered]);
    const openInEditorSvg = ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 512 512", style: svgStyle, children: (0, jsx_runtime_1.jsx)("path", { fill: svgFillColor, d: "M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" }) }));
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    return ((0, jsx_runtime_1.jsx)("button", { title: buttonTooltip, type: "button", onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, style: buttonStyle, onClick: handleClick, children: openInEditorSvg }));
};
exports.OpenIssueButton = OpenIssueButton;

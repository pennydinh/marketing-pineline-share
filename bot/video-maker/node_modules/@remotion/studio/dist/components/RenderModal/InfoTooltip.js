"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoTooltip = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const is_menu_item_1 = require("../Menu/is-menu-item");
const styles_1 = require("../Menu/styles");
const arrow = {
    height: 7,
    display: 'block',
    overflow: 'visible',
    marginLeft: 7,
};
const arrowUp = {
    ...arrow,
    transform: `translateY(1px)`,
};
const arrowDown = {
    ...arrow,
    marginTop: -1,
};
const InfoTooltip = ({ children, arrowDirection, backgroundColor }) => {
    const container = (0, react_1.useMemo)(() => {
        return {
            boxShadow: arrowDirection === 'down' ? styles_1.SHADOW_TOWARDS_TOP : styles_1.SHADOW_TOWARDS_BOTTOM,
            background: backgroundColor,
            color: 'white',
            border: '0.5px solid ' + colors_1.BORDER_COLOR,
            maxHeight: 200,
            overflow: 'auto',
            borderRadius: '4px',
        };
    }, [arrowDirection, backgroundColor]);
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'flex',
            flexDirection: arrowDirection === 'up' ? 'column-reverse' : 'column',
            alignItems: 'flex-start',
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: container, className: is_menu_item_1.VERTICAL_SCROLLBAR_CLASSNAME, children: children }), arrowDirection === 'down' ? ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 14 7", style: arrowDown, children: (0, jsx_runtime_1.jsx)("path", { d: `M 14 0 L 7 7 L 0 0`, fill: backgroundColor, strokeLinecap: "butt", stroke: colors_1.BORDER_COLOR, strokeWidth: 0.5 }) })) : null, arrowDirection === 'up' ? ((0, jsx_runtime_1.jsx)("svg", { viewBox: "0 0 14 7", style: arrowUp, children: (0, jsx_runtime_1.jsx)("path", { d: `M 0 7 L 7 0 L 14 7`, fill: backgroundColor, strokeLinecap: "butt", stroke: colors_1.BORDER_COLOR, strokeWidth: 0.5 }) })) : null] }));
};
exports.InfoTooltip = InfoTooltip;

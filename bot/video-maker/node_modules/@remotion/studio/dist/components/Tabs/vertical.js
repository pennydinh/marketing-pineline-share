"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalTab = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const z_index_1 = require("../../state/z-index");
const selectorButton = {
    border: 'none',
    flex: 1,
    padding: 8,
    paddingLeft: 16,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 14,
    color: 'inherit',
    alignItems: 'center',
};
const VerticalTab = ({ children, onClick, style, selected }) => {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const definiteStyle = (0, react_1.useMemo)(() => {
        return {
            ...selectorButton,
            backgroundColor: selected
                ? colors_1.SELECTED_BACKGROUND
                : hovered
                    ? colors_1.CLEAR_HOVER
                    : 'transparent',
            color: selected ? 'white' : colors_1.LIGHT_TEXT,
            boxShadow: selected ? 'none' : undefined,
            ...style,
        };
    }, [hovered, selected, style]);
    return ((0, jsx_runtime_1.jsx)("button", { style: definiteStyle, type: "button", onClick: onClick, tabIndex: tabIndex, onPointerLeave: onPointerLeave, onPointerEnter: onPointerEnter, children: children }));
};
exports.VerticalTab = VerticalTab;

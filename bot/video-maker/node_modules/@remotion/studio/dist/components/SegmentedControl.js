"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SegmentedControl = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const z_index_1 = require("../state/z-index");
const container = {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    border: '1px solid ' + colors_1.INPUT_BORDER_COLOR_UNHOVERED,
    flexWrap: 'wrap',
    maxWidth: 350,
    justifyContent: 'flex-end',
};
const item = {
    display: 'flex',
    fontSize: 15,
    padding: '4px 12px',
    cursor: 'pointer',
    appearance: 'none',
    border: 'none',
    flex: 1,
    justifyContent: 'center',
    whiteSpace: 'nowrap',
};
const SegmentedControl = ({ items, needsWrapping }) => {
    const controlStyle = (0, react_1.useMemo)(() => {
        if (needsWrapping) {
            return {
                ...container,
                flexWrap: 'wrap',
                maxWidth: '248px',
                justifyContent: 'flex-end',
                marginBottom: '8px',
            };
        }
        return {
            ...container,
        };
    }, [needsWrapping]);
    return ((0, jsx_runtime_1.jsx)("div", { style: controlStyle, children: items.map((i) => {
            return ((0, jsx_runtime_1.jsx)(Item, { onClick: i.onClick, selected: i.selected, children: i.label }, i.key));
        }) }));
};
exports.SegmentedControl = SegmentedControl;
const Item = ({ selected, onClick, children }) => {
    const [hovered, setHovered] = (0, react_1.useState)(false);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHovered(true);
    }, []);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHovered(false);
    }, []);
    const itemStyle = (0, react_1.useMemo)(() => {
        return {
            ...item,
            backgroundColor: selected ? colors_1.INPUT_BACKGROUND : 'transparent',
            color: selected ? 'white' : hovered ? 'white' : colors_1.LIGHT_TEXT,
        };
    }, [hovered, selected]);
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, style: itemStyle, tabIndex: tabIndex, onClick: onClick, children: children }));
};

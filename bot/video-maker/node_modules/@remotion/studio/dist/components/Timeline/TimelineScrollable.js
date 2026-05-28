"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineScrollable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const is_menu_item_1 = require("../Menu/is-menu-item");
const timeline_refs_1 = require("./timeline-refs");
const outer = {
    width: '100%',
    height: '100%',
    overflowX: 'auto',
    overflowY: 'hidden',
    position: 'relative',
    backgroundColor: colors_1.TIMELINE_BACKGROUND,
};
const TimelineScrollable = ({ children }) => {
    const containerStyle = (0, react_1.useMemo)(() => {
        return {
            width: '100%',
            minHeight: '100%',
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { ref: timeline_refs_1.scrollableRef, style: outer, className: is_menu_item_1.HORIZONTAL_SCROLLBAR_CLASSNAME, children: (0, jsx_runtime_1.jsx)("div", { style: containerStyle, children: children }) }));
};
exports.TimelineScrollable = TimelineScrollable;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubMenuComponent = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobile_layout_1 = require("../../helpers/mobile-layout");
const noop_1 = require("../../helpers/noop");
const z_index_1 = require("../../state/z-index");
const MenuContent_1 = require("../NewComposition/MenuContent");
const portals_1 = require("./portals");
const SubMenuComponent = ({ portalStyle, subMenuActivated, subMenu, onQuitFullMenu, onQuitSubMenu, }) => {
    const mobileLayout = (0, mobile_layout_1.useMobileLayout)();
    const onOutsideClick = (0, react_1.useCallback)((e) => {
        if (portals_1.portals.find((p) => p.contains(e)) || mobileLayout) {
            onQuitSubMenu();
        }
        else {
            onQuitFullMenu();
        }
    }, [mobileLayout, onQuitFullMenu, onQuitSubMenu]);
    return ((0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onEscape: onQuitFullMenu, onOutsideClick: onOutsideClick, children: (0, jsx_runtime_1.jsx)("div", { style: portalStyle, className: "css-reset", children: (0, jsx_runtime_1.jsx)(MenuContent_1.MenuContent, { onNextMenu: noop_1.noop, onPreviousMenu: onQuitSubMenu, values: subMenu.items, onHide: onQuitFullMenu, leaveLeftSpace: subMenu.leaveLeftSpace, preselectIndex: subMenuActivated === 'without-mouse' &&
                    typeof subMenu.preselectIndex === 'number'
                    ? subMenu.preselectIndex
                    : false, topItemCanBeUnselected: false, fixedHeight: null }) }) }));
};
exports.SubMenuComponent = SubMenuComponent;

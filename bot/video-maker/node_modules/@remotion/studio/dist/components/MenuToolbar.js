"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuToolbar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../helpers/colors");
const mobile_layout_1 = require("../helpers/mobile-layout");
const use_menu_structure_1 = require("../helpers/use-menu-structure");
const MenuItem_1 = require("./Menu/MenuItem");
const MenuBuildIndicator_1 = require("./MenuBuildIndicator");
const SidebarCollapserControls_1 = require("./SidebarCollapserControls");
const UpdateCheck_1 = require("./UpdateCheck");
const layout_1 = require("./layout");
const row = {
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    color: 'white',
    borderBottom: '1px solid black',
    fontSize: 13,
    paddingLeft: 6,
    paddingRight: 10,
    backgroundColor: colors_1.BACKGROUND,
};
const flex = {
    flex: 1,
};
const MenuToolbar = ({ readOnlyStudio }) => {
    const [selected, setSelected] = (0, react_1.useState)(null);
    const mobileLayout = (0, mobile_layout_1.useMobileLayout)();
    const fixedWidthRight = (0, react_1.useMemo)(() => {
        return {
            ...(mobileLayout
                ? { width: 'fit-content' }
                : {
                    width: '330px',
                }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
        };
    }, [mobileLayout]);
    const fixedWidthLeft = (0, react_1.useMemo)(() => {
        return {
            ...(mobileLayout
                ? { minWidth: '0px' }
                : {
                    minWidth: '330px',
                }),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
        };
    }, [mobileLayout]);
    const itemClicked = (0, react_1.useCallback)((itemId) => {
        setSelected(itemId);
    }, [setSelected]);
    const itemHovered = (0, react_1.useCallback)((itemId) => {
        if (selected) {
            setSelected(itemId);
        }
    }, [selected, setSelected]);
    const closeMenu = (0, react_1.useCallback)(() => {
        setSelected(null);
    }, []);
    const structure = (0, use_menu_structure_1.useMenuStructure)(closeMenu, readOnlyStudio);
    const menus = (0, react_1.useMemo)(() => {
        return structure.map((s) => s.id);
    }, [structure]);
    const onPreviousMenu = (0, react_1.useCallback)(() => {
        setSelected((s) => {
            if (s === null) {
                return null;
            }
            return menus[(menus.indexOf(s) + 1) % menus.length];
        });
    }, [menus]);
    const onNextMenu = (0, react_1.useCallback)(() => {
        setSelected((s) => {
            if (s === null) {
                return null;
            }
            if (menus.indexOf(s) === 0) {
                return menus[menus.length - 1];
            }
            return menus[(menus.indexOf(s) - 1) % menus.length];
        });
    }, [menus]);
    const onItemQuit = (0, react_1.useCallback)(() => {
        setSelected(null);
    }, [setSelected]);
    return ((0, jsx_runtime_1.jsxs)(layout_1.Row, { align: "center", className: "css-reset", style: row, children: [(0, jsx_runtime_1.jsxs)("div", { style: fixedWidthLeft, children: [structure.map((s) => {
                        return ((0, jsx_runtime_1.jsx)(MenuItem_1.MenuItem, { selected: selected === s.id, onItemSelected: itemClicked, onItemHovered: itemHovered, id: s.id, label: s.label, onItemQuit: onItemQuit, menu: s, onPreviousMenu: onPreviousMenu, onNextMenu: onNextMenu, leaveLeftPadding: s.leaveLeftPadding }, s.id));
                    }), readOnlyStudio ? null : (0, jsx_runtime_1.jsx)(UpdateCheck_1.UpdateCheck, {})] }), (0, jsx_runtime_1.jsx)("div", { style: flex }), (0, jsx_runtime_1.jsx)(MenuBuildIndicator_1.MenuBuildIndicator, {}), (0, jsx_runtime_1.jsx)("div", { style: flex }), (0, jsx_runtime_1.jsx)("div", { style: fixedWidthRight, children: (0, jsx_runtime_1.jsx)(SidebarCollapserControls_1.SidebarCollapserControls, {}) }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 1 })] }));
};
exports.MenuToolbar = MenuToolbar;

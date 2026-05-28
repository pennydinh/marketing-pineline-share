"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarCollapserControls = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ShortcutHint_1 = require("../error-overlay/remotion-overlay/ShortcutHint");
const use_keybinding_1 = require("../helpers/use-keybinding");
const sidebar_1 = require("../state/sidebar");
const InlineAction_1 = require("./InlineAction");
const TopPanel_1 = require("./TopPanel");
const style = {
    width: 16,
    height: 16,
    minWidth: 16,
    border: '1px solid currentColor',
    borderRadius: 3,
    color: 'currentColor',
    position: 'relative',
};
const SidebarCollapserControls = () => {
    const { setSidebarCollapsedState, sidebarCollapsedStateRight } = (0, react_1.useContext)(sidebar_1.SidebarContext);
    const keybindings = (0, use_keybinding_1.useKeybinding)();
    const leftSidebarStatus = (0, TopPanel_1.useResponsiveSidebarStatus)();
    const leftIcon = (0, react_1.useCallback)((color) => {
        return {
            width: '35%',
            height: '100%',
            borderRight: '1px solid ' + color,
            background: leftSidebarStatus === 'expanded' ? color : 'transparent',
        };
    }, [leftSidebarStatus]);
    const rightIcon = (0, react_1.useCallback)((color) => {
        return {
            width: '35%',
            height: '100%',
            right: 0,
            position: 'absolute',
            borderLeft: '1px solid ' + color,
            background: sidebarCollapsedStateRight === 'expanded' ? color : 'transparent',
        };
    }, [sidebarCollapsedStateRight]);
    const toggleLeft = (0, react_1.useCallback)(() => {
        setSidebarCollapsedState({
            left: (s) => {
                if (s === 'responsive') {
                    return leftSidebarStatus === 'collapsed' ? 'expanded' : 'collapsed';
                }
                return s === 'collapsed' ? 'expanded' : 'collapsed';
            },
            right: null,
        });
    }, [leftSidebarStatus, setSidebarCollapsedState]);
    const toggleRight = (0, react_1.useCallback)(() => {
        setSidebarCollapsedState({
            right: (s) => (s === 'collapsed' ? 'expanded' : 'collapsed'),
            left: null,
        });
    }, [setSidebarCollapsedState]);
    const toggleBoth = (0, react_1.useCallback)(() => {
        if (sidebarCollapsedStateRight === leftSidebarStatus) {
            setSidebarCollapsedState({
                left: (s) => {
                    if (s === 'responsive') {
                        return leftSidebarStatus === 'collapsed' ? 'expanded' : 'collapsed';
                    }
                    return s === 'collapsed' ? 'expanded' : 'collapsed';
                },
                right: (s) => (s === 'collapsed' ? 'expanded' : 'collapsed'),
            });
        }
        else if (sidebarCollapsedStateRight === 'expanded') {
            toggleRight();
        }
        else if (leftSidebarStatus === 'expanded') {
            toggleLeft();
        }
    }, [
        leftSidebarStatus,
        setSidebarCollapsedState,
        sidebarCollapsedStateRight,
        toggleLeft,
        toggleRight,
    ]);
    (0, react_1.useEffect)(() => {
        const left = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'b',
            commandCtrlKey: true,
            callback: toggleLeft,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        const right = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'j',
            commandCtrlKey: true,
            callback: toggleRight,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        const zen = keybindings.registerKeybinding({
            event: 'keydown',
            key: 'g',
            commandCtrlKey: true,
            callback: toggleBoth,
            preventDefault: true,
            triggerIfInputFieldFocused: false,
            keepRegisteredWhenNotHighestContext: false,
        });
        return () => {
            left.unregister();
            right.unregister();
            zen.unregister();
        };
    }, [keybindings, toggleBoth, toggleLeft, toggleRight]);
    const toggleLeftTooltip = (0, use_keybinding_1.areKeyboardShortcutsDisabled)()
        ? 'Toggle Left Sidebar'
        : `Toggle Left Sidebar (${ShortcutHint_1.cmdOrCtrlCharacter}+B)`;
    const toggleRightTooltip = (0, use_keybinding_1.areKeyboardShortcutsDisabled)()
        ? 'Toggle Right Sidebar'
        : `Toggle Right Sidebar (${ShortcutHint_1.cmdOrCtrlCharacter}+J)`;
    const colorStyle = (0, react_1.useCallback)((color) => {
        return {
            ...style,
            color,
        };
    }, []);
    const toggleLeftAction = (0, react_1.useCallback)((color) => {
        return ((0, jsx_runtime_1.jsx)("div", { style: colorStyle(color), title: toggleLeftTooltip, children: (0, jsx_runtime_1.jsx)("div", { style: leftIcon(color) }) }));
    }, [colorStyle, leftIcon, toggleLeftTooltip]);
    const toggleRightAction = (0, react_1.useCallback)((color) => {
        return ((0, jsx_runtime_1.jsx)("div", { style: colorStyle(color), title: toggleRightTooltip, children: (0, jsx_runtime_1.jsx)("div", { style: rightIcon(color) }) }));
    }, [colorStyle, rightIcon, toggleRightTooltip]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { onClick: toggleLeft, renderAction: toggleLeftAction }), (0, jsx_runtime_1.jsx)(InlineAction_1.InlineAction, { onClick: toggleRight, renderAction: toggleRightAction })] }));
};
exports.SidebarCollapserControls = SidebarCollapserControls;

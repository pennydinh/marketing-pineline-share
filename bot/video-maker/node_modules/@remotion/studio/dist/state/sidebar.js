"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SidebarContextProvider = exports.SidebarContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const mobile_layout_1 = require("../helpers/mobile-layout");
const storageKey = (sidebar) => {
    if (sidebar === 'right') {
        return 'remotion.sidebarRightCollapsing';
    }
    return 'remotion.sidebarCollapsing';
};
const getSavedCollapsedStateLeft = (isMobileLayout = false) => {
    const state = window.localStorage.getItem(storageKey('left'));
    if (isMobileLayout) {
        return 'collapsed';
    }
    if (state === 'collapsed') {
        return 'collapsed';
    }
    if (state === 'expanded') {
        return 'expanded';
    }
    return 'responsive';
};
const getSavedCollapsedStateRight = (isMobileLayout = false) => {
    const state = window.localStorage.getItem(storageKey('right'));
    if (isMobileLayout) {
        return 'collapsed';
    }
    if (state === 'expanded') {
        return 'expanded';
    }
    return 'collapsed';
};
const saveCollapsedState = (type, sidebar) => {
    window.localStorage.setItem(storageKey(sidebar), type);
};
exports.SidebarContext = (0, react_1.createContext)({
    sidebarCollapsedStateLeft: 'collapsed',
    setSidebarCollapsedState: () => {
        throw new Error('sidebar collapsed state');
    },
    sidebarCollapsedStateRight: 'collapsed',
});
const SidebarContextProvider = ({ children }) => {
    const isMobileLayout = (0, mobile_layout_1.useMobileLayout)();
    const [sidebarCollapsedState, setSidebarCollapsedState] = (0, react_1.useState)(() => ({
        left: getSavedCollapsedStateLeft(isMobileLayout),
        right: getSavedCollapsedStateRight(isMobileLayout),
    }));
    const value = (0, react_1.useMemo)(() => {
        return {
            sidebarCollapsedStateLeft: sidebarCollapsedState.left,
            sidebarCollapsedStateRight: sidebarCollapsedState.right,
            setSidebarCollapsedState: (options) => {
                const { left, right } = options;
                setSidebarCollapsedState((f) => {
                    const copied = { ...f };
                    if (left) {
                        const updatedLeft = typeof left === 'function' ? left(f.left) : left;
                        saveCollapsedState(updatedLeft, 'left');
                        copied.left = updatedLeft;
                    }
                    if (right) {
                        const updatedRight = typeof right === 'function' ? right(f.right) : right;
                        saveCollapsedState(updatedRight, 'right');
                        copied.right = updatedRight;
                    }
                    return copied;
                });
            },
        };
    }, [sidebarCollapsedState]);
    return ((0, jsx_runtime_1.jsx)(exports.SidebarContext.Provider, { value: value, children: children }));
};
exports.SidebarContextProvider = SidebarContextProvider;

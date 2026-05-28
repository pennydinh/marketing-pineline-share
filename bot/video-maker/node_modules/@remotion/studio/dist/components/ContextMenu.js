"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const react_dom_1 = __importDefault(require("react-dom"));
const mobile_layout_1 = require("../helpers/mobile-layout");
const noop_1 = require("../helpers/noop");
const z_index_1 = require("../state/z-index");
const portals_1 = require("./Menu/portals");
const styles_1 = require("./Menu/styles");
const MenuContent_1 = require("./NewComposition/MenuContent");
const ContextMenu = ({ children, values }) => {
    const ref = (0, react_1.useRef)(null);
    const [opened, setOpened] = (0, react_1.useState)({ type: 'not-open' });
    const { currentZIndex } = (0, z_index_1.useZIndex)();
    const style = (0, react_1.useMemo)(() => {
        return {};
    }, []);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        triggerOnWindowResize: true,
        shouldApplyCssTransforms: true,
    });
    const isMobileLayout = (0, mobile_layout_1.useMobileLayout)();
    (0, react_1.useEffect)(() => {
        const { current } = ref;
        if (!current) {
            return;
        }
        const onClick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            setOpened({ type: 'open', left: e.clientX, top: e.clientY });
            return false;
        };
        current.addEventListener('contextmenu', onClick);
        return () => {
            current.removeEventListener('contextmenu', onClick);
        };
    }, [size]);
    const spaceToBottom = (0, react_1.useMemo)(() => {
        if (size && opened.type === 'open') {
            return size.windowSize.height - opened.top;
        }
        return 0;
    }, [opened, size]);
    const spaceToTop = (0, react_1.useMemo)(() => {
        if (size && opened.type === 'open') {
            return opened.top;
        }
        return 0;
    }, [opened, size]);
    const portalStyle = (0, react_1.useMemo)(() => {
        if (opened.type === 'not-open') {
            return;
        }
        if (!size) {
            return;
        }
        const spaceToRight = size.windowSize.width - size.left;
        const spaceToLeft = size.left + size.width;
        const minSpaceRequired = isMobileLayout
            ? styles_1.MAX_MOBILE_MENU_WIDTH
            : styles_1.MAX_MENU_WIDTH;
        const verticalLayout = spaceToTop > spaceToBottom ? 'bottom' : 'top';
        const canOpenOnLeft = spaceToLeft >= minSpaceRequired;
        const canOpenOnRight = spaceToRight >= minSpaceRequired;
        const horizontalLayout = canOpenOnRight ? 'left' : 'right';
        return {
            ...styles_1.menuContainerTowardsTop,
            ...(verticalLayout === 'top'
                ? {
                    top: opened.top,
                }
                : {
                    bottom: size.windowSize.height - opened.top,
                }),
            ...(horizontalLayout === 'left'
                ? {
                    left: opened.left,
                }
                : {
                    right: canOpenOnLeft ? size.windowSize.width - opened.left : 0,
                }),
        };
    }, [opened, size, isMobileLayout, spaceToTop, spaceToBottom]);
    const onHide = (0, react_1.useCallback)(() => {
        setOpened({ type: 'not-open' });
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: ref, onContextMenu: () => false, style: style, children: children }), portalStyle
                ? react_dom_1.default.createPortal((0, jsx_runtime_1.jsx)("div", { style: styles_1.fullScreenOverlay, children: (0, jsx_runtime_1.jsx)("div", { style: styles_1.outerPortal, className: "css-reset", children: (0, jsx_runtime_1.jsx)(z_index_1.HigherZIndex, { onOutsideClick: onHide, onEscape: onHide, children: (0, jsx_runtime_1.jsx)("div", { style: portalStyle, children: (0, jsx_runtime_1.jsx)(MenuContent_1.MenuContent, { onNextMenu: noop_1.noop, onPreviousMenu: noop_1.noop, values: values, onHide: onHide, leaveLeftSpace: true, preselectIndex: false, topItemCanBeUnselected: false, fixedHeight: null }) }) }) }) }), (0, portals_1.getPortal)(currentZIndex))
                : null] }));
};
exports.ContextMenu = ContextMenu;

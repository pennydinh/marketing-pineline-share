"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMessage = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const player_1 = require("@remotion/player");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const carets_1 = require("./carets");
const fontSize = 24;
const lineHeight = 1.5;
const maxLines = 2;
const buttonSize = 32;
const maskImage = 'linear-gradient(to bottom, white 60%, transparent)';
const container = {
    position: 'relative',
    marginBottom: 15,
};
const messageContainer = {
    overflow: 'hidden',
};
const textContainer = {
    fontSize,
    lineHeight,
};
const moreLine = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    border: `1px solid ${colors_1.INPUT_BORDER_COLOR_HOVERED}`,
    height: 0,
    marginTop: 4,
};
const moreButton = {
    height: buttonSize,
    width: buttonSize,
    borderRadius: buttonSize / 2,
    backgroundColor: colors_1.INPUT_BACKGROUND,
    border: `1px solid ${colors_1.INPUT_BORDER_COLOR_UNHOVERED}`,
    marginTop: -buttonSize / 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white',
};
const ErrorMessage = ({ message }) => {
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const ref = (0, react_1.useRef)(null);
    const size = player_1.PlayerInternals.useElementSize(ref, {
        shouldApplyCssTransforms: false,
        triggerOnWindowResize: true,
    });
    const errorLines = size ? size.height / (lineHeight * fontSize) : null;
    const style = (0, react_1.useMemo)(() => {
        const isExpanded = expanded || (errorLines !== null && errorLines <= maxLines);
        return {
            ...messageContainer,
            maxHeight: isExpanded ? undefined : fontSize * lineHeight * maxLines,
            maskImage: isExpanded ? undefined : maskImage,
            WebkitMaskImage: isExpanded ? undefined : maskImage,
        };
    }, [errorLines, expanded]);
    const toggle = (0, react_1.useCallback)(() => {
        setExpanded((e) => !e);
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)("div", { style: style, children: (0, jsx_runtime_1.jsx)("div", { ref: ref, style: textContainer, children: message }) }), errorLines !== null && errorLines > maxLines ? ((0, jsx_runtime_1.jsx)("div", { style: moreLine, children: (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: toggle, style: moreButton, children: (0, jsx_runtime_1.jsx)(carets_1.CaretDown, { invert: expanded }) }) })) : null] }));
};
exports.ErrorMessage = ErrorMessage;

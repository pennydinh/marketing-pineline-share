"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBuildIndicator = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_id_1 = require("../helpers/client-id");
const OpenEditorButton_1 = require("./OpenEditorButton");
const Spinner_1 = require("./Spinner");
const layout_1 = require("./layout");
const cwd = {
    fontSize: 13,
    opacity: 0.8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};
const spinnerSize = 14;
const spinner = {
    position: 'relative',
    width: spinnerSize,
    marginTop: 4,
};
const noSpinner = {
    position: 'relative',
    width: spinnerSize,
};
const MenuBuildIndicator = () => {
    const [isBuilding, setIsBuilding] = (0, react_1.useState)(false);
    const ctx = (0, react_1.useContext)(client_id_1.StudioServerConnectionCtx).previewServerState;
    const showButton = window.remotion_editorName && ctx.type === 'connected';
    (0, react_1.useEffect)(() => {
        window.remotion_isBuilding = () => {
            setIsBuilding(true);
        };
        window.remotion_finishedBuilding = () => {
            setIsBuilding(false);
        };
        return () => {
            window.remotion_isBuilding = undefined;
            window.remotion_finishedBuilding = undefined;
        };
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { style: cwd, title: window.remotion_cwd, children: [showButton ? (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 2 }) : null, isBuilding ? ((0, jsx_runtime_1.jsx)("div", { style: spinner, children: (0, jsx_runtime_1.jsx)(Spinner_1.Spinner, { duration: 0.5, size: spinnerSize }) })) : ((0, jsx_runtime_1.jsx)("div", { style: noSpinner })), showButton ? (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }) : null, window.remotion_projectName, showButton ? (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.25 }) : null, showButton ? ((0, jsx_runtime_1.jsx)(OpenEditorButton_1.OpenEditorButton, { type: "editor" })) : window.remotion_gitSource ? ((0, jsx_runtime_1.jsx)(OpenEditorButton_1.OpenEditorButton, { type: "git" })) : null] }));
};
exports.MenuBuildIndicator = MenuBuildIndicator;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsRulerVisible = void 0;
const react_1 = require("react");
const remotion_1 = require("remotion");
const editor_rulers_1 = require("../../state/editor-rulers");
const useIsRulerVisible = () => {
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const { editorShowRulers } = (0, react_1.useContext)(editor_rulers_1.EditorShowRulersContext);
    return (editorShowRulers && canvasContent && canvasContent.type === 'composition');
};
exports.useIsRulerVisible = useIsRulerVisible;

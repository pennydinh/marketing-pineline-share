"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowRulersProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const editor_rulers_1 = require("../state/editor-rulers");
const ShowRulersProvider = ({ children }) => {
    const [editorShowRulers, setEditorShowRulersState] = (0, react_1.useState)(() => (0, editor_rulers_1.loadEditorShowRulersOption)());
    const setEditorShowRulers = (0, react_1.useCallback)((newValue) => {
        setEditorShowRulersState((prevState) => {
            const newVal = newValue(prevState);
            (0, editor_rulers_1.persistEditorShowRulersOption)(newVal);
            return newVal;
        });
    }, []);
    const editorShowRulersCtx = (0, react_1.useMemo)(() => {
        return {
            editorShowRulers,
            setEditorShowRulers,
        };
    }, [editorShowRulers, setEditorShowRulers]);
    return ((0, jsx_runtime_1.jsx)(editor_rulers_1.EditorShowRulersContext.Provider, { value: editorShowRulersCtx, children: children }));
};
exports.ShowRulersProvider = ShowRulersProvider;

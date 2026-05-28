"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_RULER_MARKING_GAP_PX = exports.MAXIMUM_PREDEFINED_RULER_SCALE_GAP = exports.PREDEFINED_RULER_SCALE_GAPS = exports.MINIMUM_VISIBLE_CANVAS_SIZE = exports.RULER_WIDTH = exports.EditorShowRulersContext = exports.loadEditorShowRulersOption = exports.persistEditorShowRulersOption = void 0;
const react_1 = require("react");
const persistEditorShowRulersOption = (option) => {
    localStorage.setItem('remotion.editorShowRulers', String(option));
};
exports.persistEditorShowRulersOption = persistEditorShowRulersOption;
const loadEditorShowRulersOption = () => {
    const item = localStorage.getItem('remotion.editorShowRulers');
    return item === 'true';
};
exports.loadEditorShowRulersOption = loadEditorShowRulersOption;
exports.EditorShowRulersContext = (0, react_1.createContext)({
    editorShowRulers: (0, exports.loadEditorShowRulersOption)(),
    setEditorShowRulers: () => undefined,
});
exports.RULER_WIDTH = 20;
exports.MINIMUM_VISIBLE_CANVAS_SIZE = 50;
exports.PREDEFINED_RULER_SCALE_GAPS = [
    1, 2, 5, 10, 20, 50, 100, 250, 500, 1000, 2000, 5000,
];
exports.MAXIMUM_PREDEFINED_RULER_SCALE_GAP = 5000;
exports.MINIMUM_RULER_MARKING_GAP_PX = 50;

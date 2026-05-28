"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const use_studio_canvas_dimensions_1 = require("../../helpers/use-studio-canvas-dimensions");
const editor_guides_1 = require("../../state/editor-guides");
const Guide_1 = __importDefault(require("./Guide"));
const EditorGuides = ({ canvasSize, contentDimensions, assetMetadata }) => {
    const { canvasPosition: canvasDimensions, scale } = (0, use_studio_canvas_dimensions_1.useStudioCanvasDimensions)({
        canvasSize,
        contentDimensions,
        assetMetadata,
    });
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    if (canvasContent === null || canvasContent.type !== 'composition') {
        throw new Error('Expected to be in a composition');
    }
    const { guidesList } = (0, react_1.useContext)(editor_guides_1.EditorShowGuidesContext);
    const guidesForThisComposition = (0, react_1.useMemo)(() => {
        return guidesList.filter((guide) => {
            return guide.compositionId === canvasContent.compositionId;
        });
    }, [canvasContent.compositionId, guidesList]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: guidesForThisComposition.map((guide) => {
            return ((0, jsx_runtime_1.jsx)(Guide_1.default, { guide: guide, canvasDimensions: canvasDimensions, scale: scale }, guide.id));
        }) }));
};
exports.default = EditorGuides;

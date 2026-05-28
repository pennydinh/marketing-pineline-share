"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorRulers = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const colors_1 = require("../../helpers/colors");
const editor_ruler_1 = require("../../helpers/editor-ruler");
const use_studio_canvas_dimensions_1 = require("../../helpers/use-studio-canvas-dimensions");
const editor_guides_1 = require("../../state/editor-guides");
const editor_rulers_1 = require("../../state/editor-rulers");
const Ruler_1 = __importDefault(require("./Ruler"));
const originBlockStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottom: '1px solid ' + colors_1.RULER_COLOR,
    borderRight: '1px solid ' + colors_1.RULER_COLOR,
    width: `${editor_rulers_1.RULER_WIDTH}px`,
    height: `${editor_rulers_1.RULER_WIDTH}px`,
    background: colors_1.BACKGROUND,
};
const EditorRulers = ({ contentDimensions, canvasSize, assetMetadata, containerRef }) => {
    const { scale, canvasPosition } = (0, use_studio_canvas_dimensions_1.useStudioCanvasDimensions)({
        canvasSize,
        contentDimensions,
        assetMetadata,
    });
    const { shouldCreateGuideRef, shouldDeleteGuideRef, setGuidesList, selectedGuideId, setSelectedGuideId, } = (0, react_1.useContext)(editor_guides_1.EditorShowGuidesContext);
    const rulerMarkingGaps = (0, react_1.useMemo)(() => {
        const minimumGap = editor_rulers_1.MINIMUM_RULER_MARKING_GAP_PX;
        const predefinedGap = editor_rulers_1.PREDEFINED_RULER_SCALE_GAPS.find((gap) => gap * scale > minimumGap);
        return predefinedGap || editor_rulers_1.MAXIMUM_PREDEFINED_RULER_SCALE_GAP;
    }, [scale]);
    const horizontalRulerScaleRange = (0, react_1.useMemo)(() => (0, editor_ruler_1.getRulerScaleRange)({
        canvasLength: canvasPosition.width,
        scale,
        canvasSize,
    }), [canvasPosition.width, canvasSize, scale]);
    const verticalRulerScaleRange = (0, react_1.useMemo)(() => (0, editor_ruler_1.getRulerScaleRange)({
        canvasLength: canvasPosition.height,
        scale,
        canvasSize,
    }), [canvasPosition.height, canvasSize, scale]);
    const { points: horizontalRulerPoints, startMarking: horizontalRulerStartMarking, } = (0, react_1.useMemo)(() => (0, editor_ruler_1.getRulerPoints)({
        rulerScaleRange: horizontalRulerScaleRange,
        rulerMarkingGaps,
        scale,
    }), [horizontalRulerScaleRange, rulerMarkingGaps, scale]);
    const { points: verticalRulerPoints, startMarking: verticalRulerStartMarking } = (0, react_1.useMemo)(() => (0, editor_ruler_1.getRulerPoints)({
        rulerScaleRange: verticalRulerScaleRange,
        rulerMarkingGaps,
        scale,
    }), [verticalRulerScaleRange, rulerMarkingGaps, scale]);
    const requestAnimationFrameRef = (0, react_1.useRef)(null);
    const onMouseMove = (0, react_1.useCallback)((e) => {
        if (requestAnimationFrameRef.current) {
            cancelAnimationFrame(requestAnimationFrameRef.current);
        }
        requestAnimationFrameRef.current = requestAnimationFrame(() => {
            var _a;
            const { clientX: mouseX, clientY: mouseY } = e;
            const { left: containerLeft = 0, top: containerTop = 0, right: containerRight = 0, bottom: containerBottom = 0, } = ((_a = containerRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect()) || {};
            if (mouseX < containerLeft ||
                mouseX > containerRight ||
                mouseY < containerTop ||
                mouseY > containerBottom) {
                if (!shouldDeleteGuideRef.current) {
                    shouldDeleteGuideRef.current = true;
                }
                if (document.body.style.cursor !== 'no-drop') {
                    document.body.style.cursor = 'no-drop';
                }
                setGuidesList((prevState) => {
                    const newGuides = prevState.map((guide) => {
                        if (guide.id !== selectedGuideId) {
                            return guide;
                        }
                        return {
                            ...guide,
                            show: false,
                        };
                    });
                    (0, editor_guides_1.persistGuidesList)(newGuides);
                    return newGuides;
                });
            }
            else {
                if (shouldDeleteGuideRef.current) {
                    shouldDeleteGuideRef.current = false;
                }
                setGuidesList((prevState) => {
                    // Intentionally no persist, only persist on mouse up
                    return prevState.map((guide) => {
                        if (guide.id !== selectedGuideId) {
                            return guide;
                        }
                        const position = guide.orientation === 'vertical'
                            ? (mouseX - containerLeft) / scale -
                                canvasPosition.left / scale
                            : (mouseY - containerTop) / scale -
                                canvasPosition.top / scale;
                        const desiredCursor = guide.orientation === 'vertical' ? 'ew-resize' : 'ns-resize';
                        if (document.body.style.cursor !== desiredCursor) {
                            document.body.style.cursor = desiredCursor;
                        }
                        return {
                            ...guide,
                            position: Math.floor(position / 1.0),
                            show: true,
                        };
                    });
                });
            }
        });
    }, [
        containerRef,
        shouldDeleteGuideRef,
        setGuidesList,
        selectedGuideId,
        scale,
        canvasPosition.left,
        canvasPosition.top,
    ]);
    const onMouseUp = (0, react_1.useCallback)(() => {
        setGuidesList((prevState) => {
            const newGuides = prevState.filter((selected) => {
                if (!shouldDeleteGuideRef.current) {
                    return true;
                }
                return selected.id !== selectedGuideId;
            });
            (0, editor_guides_1.persistGuidesList)(newGuides);
            return newGuides;
        });
        shouldDeleteGuideRef.current = false;
        document.body.style.cursor = 'auto';
        shouldCreateGuideRef.current = false;
        setSelectedGuideId(() => null);
        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
    }, [
        selectedGuideId,
        shouldCreateGuideRef,
        shouldDeleteGuideRef,
        setSelectedGuideId,
        setGuidesList,
        onMouseMove,
    ]);
    (0, react_1.useEffect)(() => {
        if (selectedGuideId !== null) {
            document.addEventListener('pointermove', onMouseMove);
            document.addEventListener('pointerup', onMouseUp);
        }
        return () => {
            document.removeEventListener('pointermove', onMouseMove);
            document.removeEventListener('pointerup', onMouseUp);
            if (requestAnimationFrameRef.current) {
                cancelAnimationFrame(requestAnimationFrameRef.current);
            }
        };
    }, [selectedGuideId, onMouseMove, onMouseUp]);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { style: originBlockStyles }), (0, jsx_runtime_1.jsx)(Ruler_1.default, { orientation: "horizontal", scale: scale, points: horizontalRulerPoints, startMarking: horizontalRulerStartMarking, markingGaps: rulerMarkingGaps, originOffset: canvasPosition.left, size: canvasSize }), (0, jsx_runtime_1.jsx)(Ruler_1.default, { orientation: "vertical", scale: scale, points: verticalRulerPoints, startMarking: verticalRulerStartMarking, markingGaps: rulerMarkingGaps, originOffset: canvasPosition.top, size: canvasSize })] }));
};
exports.EditorRulers = EditorRulers;

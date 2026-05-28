"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const colors_1 = require("../../helpers/colors");
const editor_ruler_1 = require("../../helpers/editor-ruler");
const editor_guides_1 = require("../../state/editor-guides");
const editor_rulers_1 = require("../../state/editor-rulers");
const makeGuideId = () => {
    return Math.random().toString(36).substring(7);
};
const Ruler = ({ scale, points, originOffset, startMarking, size, markingGaps, orientation, }) => {
    const rulerCanvasRef = (0, react_1.useRef)(null);
    const isVerticalRuler = orientation === 'vertical';
    const { shouldCreateGuideRef, setGuidesList, selectedGuideId, hoveredGuideId, setSelectedGuideId, guidesList, setEditorShowGuides, } = (0, react_1.useContext)(editor_guides_1.EditorShowGuidesContext);
    const unsafeVideoConfig = remotion_1.Internals.useUnsafeVideoConfig();
    if (!unsafeVideoConfig) {
        throw new Error('Video config not set');
    }
    const [cursor, setCursor] = (0, react_1.useState)(isVerticalRuler ? 'ew-resize' : 'ns-resize');
    const selectedOrHoveredGuide = (0, react_1.useMemo)(() => {
        var _a, _b;
        return ((_b = (_a = guidesList.find((guide) => guide.id === selectedGuideId)) !== null && _a !== void 0 ? _a : guidesList.find((guide) => guide.id === hoveredGuideId)) !== null && _b !== void 0 ? _b : null);
    }, [guidesList, hoveredGuideId, selectedGuideId]);
    const rulerWidth = isVerticalRuler ? editor_rulers_1.RULER_WIDTH : size.width - editor_rulers_1.RULER_WIDTH;
    const rulerHeight = isVerticalRuler ? size.height - editor_rulers_1.RULER_WIDTH : editor_rulers_1.RULER_WIDTH;
    (0, react_1.useEffect)(() => {
        (0, editor_ruler_1.drawMarkingOnRulerCanvas)({
            scale,
            points,
            startMarking,
            originOffset,
            markingGaps,
            orientation,
            rulerCanvasRef,
            selectedGuide: selectedOrHoveredGuide,
            canvasHeight: rulerHeight * window.devicePixelRatio,
            canvasWidth: rulerWidth * window.devicePixelRatio,
        });
    }, [
        scale,
        points,
        startMarking,
        originOffset,
        markingGaps,
        orientation,
        selectedOrHoveredGuide,
        size,
        rulerHeight,
        rulerWidth,
    ]);
    const rulerStyle = (0, react_1.useMemo)(() => ({
        position: 'absolute',
        background: colors_1.BACKGROUND,
        width: rulerWidth,
        height: rulerHeight,
        left: isVerticalRuler ? 0 : 'unset',
        top: isVerticalRuler ? 'unset' : 0,
        borderBottom: isVerticalRuler ? undefined : '1px solid ' + colors_1.RULER_COLOR,
        borderRight: isVerticalRuler ? '1px solid ' + colors_1.RULER_COLOR : undefined,
        cursor,
    }), [rulerWidth, rulerHeight, cursor, isVerticalRuler]);
    const onMouseDown = (0, react_1.useCallback)((e) => {
        if (e.button !== 0) {
            return;
        }
        e.preventDefault();
        shouldCreateGuideRef.current = true;
        document.body.style.cursor = 'no-drop';
        const guideId = makeGuideId();
        setEditorShowGuides(() => true);
        setSelectedGuideId(() => guideId);
        setGuidesList((prevState) => {
            return [
                ...prevState,
                {
                    orientation,
                    position: -originOffset,
                    show: false,
                    id: guideId,
                    compositionId: unsafeVideoConfig.id,
                },
            ];
        });
    }, [
        shouldCreateGuideRef,
        setEditorShowGuides,
        setSelectedGuideId,
        setGuidesList,
        orientation,
        originOffset,
        unsafeVideoConfig.id,
    ]);
    const changeCursor = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        if (selectedGuideId !== null) {
            setCursor('no-drop');
        }
    }, [setCursor, selectedGuideId]);
    (0, react_1.useEffect)(() => {
        if (selectedGuideId === null) {
            setCursor(isVerticalRuler ? 'ew-resize' : 'ns-resize');
        }
    }, [selectedGuideId, isVerticalRuler]);
    return ((0, jsx_runtime_1.jsx)("canvas", { ref: rulerCanvasRef, width: rulerWidth * window.devicePixelRatio, height: rulerHeight * window.devicePixelRatio, style: rulerStyle, onPointerDown: onMouseDown, onPointerEnter: changeCursor, onPointerLeave: changeCursor }));
};
exports.default = Ruler;

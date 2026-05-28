"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const no_react_1 = require("remotion/no-react");
const colors_1 = require("../../helpers/colors");
const editor_guides_1 = require("../../state/editor-guides");
const editor_rulers_1 = require("../../state/editor-rulers");
const ContextMenu_1 = require("../ContextMenu");
const PADDING_FOR_EASY_DRAG = 4;
const GuideComp = ({ guide, canvasDimensions, scale }) => {
    const { shouldCreateGuideRef, setGuidesList, setSelectedGuideId, selectedGuideId, setHoveredGuideId, hoveredGuideId, } = (0, react_1.useContext)(editor_guides_1.EditorShowGuidesContext);
    const onPointerEnter = (0, react_1.useCallback)(() => {
        setHoveredGuideId(() => guide.id);
    }, [guide.id, setHoveredGuideId]);
    const onPointerLeave = (0, react_1.useCallback)(() => {
        setHoveredGuideId(() => null);
    }, [setHoveredGuideId]);
    const isVerticalGuide = guide.orientation === 'vertical';
    const guideStyle = (0, react_1.useMemo)(() => {
        const canvasPosition = isVerticalGuide
            ? canvasDimensions.left
            : canvasDimensions.top;
        const guidePosition = guide.position * scale + canvasPosition;
        return {
            position: 'absolute',
            width: `${isVerticalGuide ? '1px' : '100%'}`,
            height: `${isVerticalGuide ? '100%' : '1px'}`,
            left: `${isVerticalGuide ? guidePosition - PADDING_FOR_EASY_DRAG : 0}px`,
            top: `${isVerticalGuide ? 0 : guidePosition - PADDING_FOR_EASY_DRAG}px`,
            cursor: `${isVerticalGuide ? 'ew-resize' : 'ns-resize'}`,
            padding: isVerticalGuide
                ? `0 ${PADDING_FOR_EASY_DRAG}px`
                : `${PADDING_FOR_EASY_DRAG}px 0`,
        };
    }, [guide, scale, canvasDimensions, isVerticalGuide]);
    const guideContentStyle = (0, react_1.useMemo)(() => {
        return {
            position: 'relative',
            minWidth: `${isVerticalGuide ? '1px' : `calc(100% + ${editor_rulers_1.RULER_WIDTH}px`}`,
            minHeight: `${isVerticalGuide ? `calc(100% + ${editor_rulers_1.RULER_WIDTH}px` : '1px'}`,
            top: `${isVerticalGuide ? `-${editor_rulers_1.RULER_WIDTH}px` : '0px'}`,
            left: `${isVerticalGuide ? '0px' : `-${editor_rulers_1.RULER_WIDTH}px`}`,
            display: guide.show ? 'block' : 'none',
            backgroundColor: selectedGuideId === guide.id || hoveredGuideId === guide.id
                ? colors_1.SELECTED_GUIDE
                : colors_1.UNSELECTED_GUIDE,
        };
    }, [isVerticalGuide, guide.show, guide.id, selectedGuideId, hoveredGuideId]);
    const onMouseDown = (0, react_1.useCallback)((e) => {
        e.preventDefault();
        if (e.button !== 0) {
            return;
        }
        shouldCreateGuideRef.current = true;
        document.body.style.cursor = 'no-drop';
        setSelectedGuideId(() => guide.id);
    }, [shouldCreateGuideRef, setSelectedGuideId, guide.id]);
    const values = (0, react_1.useMemo)(() => {
        return [
            {
                id: '1',
                keyHint: null,
                label: 'Remove guide',
                leftItem: null,
                onClick: () => {
                    setGuidesList((prevState) => {
                        const newGuides = prevState.filter((selected) => {
                            return selected.id !== guide.id;
                        });
                        (0, editor_guides_1.persistGuidesList)(newGuides);
                        return newGuides;
                    });
                },
                quickSwitcherLabel: null,
                subMenu: null,
                type: 'item',
                value: 'remove',
            },
        ];
    }, [guide.id, setGuidesList]);
    return ((0, jsx_runtime_1.jsx)(ContextMenu_1.ContextMenu, { values: values, children: (0, jsx_runtime_1.jsx)("div", { style: guideStyle, onMouseDown: onMouseDown, className: "__remotion_editor_guide", onPointerEnter: onPointerEnter, onPointerLeave: onPointerLeave, children: (0, jsx_runtime_1.jsx)("div", { style: guideContentStyle, className: [
                    '__remotion_editor_guide_content',
                    selectedGuideId === guide.id || hoveredGuideId === guide.id
                        ? '__remotion_editor_guide_selected'
                        : null,
                ]
                    .filter(no_react_1.NoReactInternals.truthy)
                    .join(' ') }) }) }));
};
exports.default = (0, react_1.memo)(GuideComp);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineZoomControls = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const remotion_1 = require("remotion");
const is_current_selected_still_1 = require("../../helpers/is-current-selected-still");
const minus_1 = require("../../icons/minus");
const plus_1 = require("../../icons/plus");
const timeline_zoom_1 = require("../../state/timeline-zoom");
const z_index_1 = require("../../state/z-index");
const ControlButton_1 = require("../ControlButton");
const layout_1 = require("../layout");
const container = {
    color: 'black',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
};
const buttonStyle = {
    fontSize: 24,
};
const iconStyle = {
    color: 'white',
    width: 14,
};
const TimelineZoomControls = () => {
    var _a;
    const { canvasContent } = (0, react_1.useContext)(remotion_1.Internals.CompositionManager);
    const { setZoom, zoom: zoomMap } = (0, react_1.useContext)(timeline_zoom_1.TimelineZoomCtx);
    const { tabIndex } = (0, z_index_1.useZIndex)();
    const onMinusClicked = (0, react_1.useCallback)(() => {
        if (canvasContent === null || canvasContent.type !== 'composition') {
            return;
        }
        setZoom(canvasContent.compositionId, (z) => Math.max(timeline_zoom_1.TIMELINE_MIN_ZOOM, z - 0.2));
    }, [canvasContent, setZoom]);
    const onPlusClicked = (0, react_1.useCallback)(() => {
        if (canvasContent === null || canvasContent.type !== 'composition') {
            return;
        }
        setZoom(canvasContent.compositionId, (z) => Math.min(timeline_zoom_1.TIMELINE_MAX_ZOOM, z + 0.2));
    }, [canvasContent, setZoom]);
    const onChange = (0, react_1.useCallback)((e) => {
        if (canvasContent === null || canvasContent.type !== 'composition') {
            return;
        }
        setZoom(canvasContent.compositionId, () => Number(e.target.value));
    }, [canvasContent, setZoom]);
    const isStill = (0, is_current_selected_still_1.useIsStill)();
    if (isStill ||
        canvasContent === null ||
        canvasContent.type !== 'composition') {
        return null;
    }
    const zoom = (_a = zoomMap[canvasContent.compositionId]) !== null && _a !== void 0 ? _a : timeline_zoom_1.TIMELINE_MIN_ZOOM;
    return ((0, jsx_runtime_1.jsxs)("div", { style: container, children: [(0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { onClick: onMinusClicked, style: buttonStyle, title: "Zoom out timeline", role: 'ControlButton', type: "button", disabled: timeline_zoom_1.TIMELINE_MIN_ZOOM === zoom, children: (0, jsx_runtime_1.jsx)(minus_1.Minus, { style: iconStyle }) }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)("input", { title: `Timeline zoom (${zoom}x)`, alt: `Timeline zoom (${zoom}x)`, type: 'range', min: timeline_zoom_1.TIMELINE_MIN_ZOOM, step: 0.1, value: zoom, max: timeline_zoom_1.TIMELINE_MAX_ZOOM, onChange: onChange, className: "__remotion-timeline-slider", tabIndex: tabIndex }), (0, jsx_runtime_1.jsx)(layout_1.Spacing, { x: 0.5 }), (0, jsx_runtime_1.jsx)(ControlButton_1.ControlButton, { onClick: onPlusClicked, style: buttonStyle, title: "Zoom in timeline", role: 'button', type: "button", disabled: timeline_zoom_1.TIMELINE_MAX_ZOOM === zoom, children: (0, jsx_runtime_1.jsx)(plus_1.Plus, { color: "currentcolor", style: iconStyle }) })] }));
};
exports.TimelineZoomControls = TimelineZoomControls;

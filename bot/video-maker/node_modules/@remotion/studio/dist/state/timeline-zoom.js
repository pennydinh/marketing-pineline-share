"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelineZoomContext = exports.TimelineZoomCtx = exports.TIMELINE_MAX_ZOOM = exports.TIMELINE_MIN_ZOOM = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const imperative_state_1 = require("../components/Timeline/imperative-state");
const timeline_scroll_logic_1 = require("../components/Timeline/timeline-scroll-logic");
const ZoomPersistor_1 = require("../components/ZoomPersistor");
exports.TIMELINE_MIN_ZOOM = 1;
exports.TIMELINE_MAX_ZOOM = 5;
exports.TimelineZoomCtx = (0, react_1.createContext)({
    zoom: {},
    setZoom: () => {
        throw new Error('has no context');
    },
});
const TimelineZoomContext = ({ children }) => {
    const [zoom, setZoom] = (0, react_1.useState)(() => (0, ZoomPersistor_1.getZoomFromLocalStorage)());
    const value = (0, react_1.useMemo)(() => {
        return {
            zoom,
            setZoom: (compositionId, callback) => {
                setZoom((prevZoomMap) => {
                    var _a, _b;
                    const newZoomWithFloatingPointErrors = Math.min(exports.TIMELINE_MAX_ZOOM, Math.max(exports.TIMELINE_MIN_ZOOM, callback((_a = prevZoomMap[compositionId]) !== null && _a !== void 0 ? _a : exports.TIMELINE_MIN_ZOOM)));
                    const newZoom = Math.round(newZoomWithFloatingPointErrors * 10) / 10;
                    (0, timeline_scroll_logic_1.zoomAndPreserveCursor)({
                        oldZoom: (_b = prevZoomMap[compositionId]) !== null && _b !== void 0 ? _b : exports.TIMELINE_MIN_ZOOM,
                        newZoom,
                        currentDurationInFrames: (0, imperative_state_1.getCurrentDuration)(),
                        currentFrame: (0, imperative_state_1.getCurrentFrame)(),
                    });
                    return { ...prevZoomMap, [compositionId]: newZoom };
                });
            },
        };
    }, [zoom]);
    return ((0, jsx_runtime_1.jsx)(exports.TimelineZoomCtx.Provider, { value: value, children: children }));
};
exports.TimelineZoomContext = TimelineZoomContext;

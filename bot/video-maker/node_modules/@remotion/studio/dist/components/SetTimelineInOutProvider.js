"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetTimelineInOutProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const in_out_1 = require("../state/in-out");
const marks_1 = require("../state/marks");
const SetTimelineInOutProvider = ({ children }) => {
    const [inAndOutFrames, setInAndOutFrames] = (0, react_1.useState)(() => (0, marks_1.loadMarks)());
    const setTimelineInOutContextValue = (0, react_1.useMemo)(() => {
        return {
            setInAndOutFrames,
        };
    }, []);
    (0, react_1.useEffect)(() => {
        (0, marks_1.persistMarks)(inAndOutFrames);
    }, [inAndOutFrames]);
    return ((0, jsx_runtime_1.jsx)(in_out_1.TimelineInOutContext.Provider, { value: inAndOutFrames, children: (0, jsx_runtime_1.jsx)(in_out_1.SetTimelineInOutContext.Provider, { value: setTimelineInOutContextValue, children: children }) }));
};
exports.SetTimelineInOutProvider = SetTimelineInOutProvider;

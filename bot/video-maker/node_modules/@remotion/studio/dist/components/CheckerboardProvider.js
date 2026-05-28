"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerboardProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const checkerboard_1 = require("../state/checkerboard");
const CheckerboardProvider = ({ children }) => {
    const [checkerboard, setCheckerboardState] = (0, react_1.useState)(() => (0, checkerboard_1.loadCheckerboardOption)());
    const setCheckerboard = (0, react_1.useCallback)((newValue) => {
        setCheckerboardState((prevState) => {
            const newVal = newValue(prevState);
            (0, checkerboard_1.persistCheckerboardOption)(newVal);
            return newVal;
        });
    }, []);
    const checkerboardCtx = (0, react_1.useMemo)(() => {
        return {
            checkerboard,
            setCheckerboard,
        };
    }, [checkerboard, setCheckerboard]);
    return ((0, jsx_runtime_1.jsx)(checkerboard_1.CheckerboardContext.Provider, { value: checkerboardCtx, children: children }));
};
exports.CheckerboardProvider = CheckerboardProvider;

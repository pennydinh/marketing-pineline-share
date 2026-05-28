"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckerboardContext = exports.loadCheckerboardOption = exports.persistCheckerboardOption = void 0;
const react_1 = require("react");
const persistCheckerboardOption = (option) => {
    localStorage.setItem('option', String(option));
};
exports.persistCheckerboardOption = persistCheckerboardOption;
const loadCheckerboardOption = () => {
    const item = localStorage.getItem('option');
    return item !== 'false';
};
exports.loadCheckerboardOption = loadCheckerboardOption;
exports.CheckerboardContext = (0, react_1.createContext)({
    checkerboard: (0, exports.loadCheckerboardOption)(),
    setCheckerboard: () => undefined,
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighestZIndexProvider = exports.HighestZIndexContext = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.HighestZIndexContext = (0, react_1.createContext)({
    highestIndex: 0,
    registerZIndex: () => undefined,
    unregisterZIndex: () => undefined,
});
const HighestZIndexProvider = ({ children }) => {
    const [zIndexes, setZIndexes] = (0, react_1.useState)([]);
    const registerZIndex = (0, react_1.useCallback)((newIndex) => {
        setZIndexes((prev) => [...prev, newIndex]);
    }, []);
    const unregisterZIndex = (0, react_1.useCallback)((newIndex) => {
        setZIndexes((prev) => {
            const index = prev.indexOf(newIndex);
            if (index === -1) {
                throw new Error('did not find z-index ' + newIndex);
            }
            return prev.filter((_n, i) => i !== index);
        });
    }, []);
    const highestIndex = Math.max(...zIndexes);
    const value = (0, react_1.useMemo)(() => {
        return {
            highestIndex,
            registerZIndex,
            unregisterZIndex,
        };
    }, [registerZIndex, unregisterZIndex, highestIndex]);
    return ((0, jsx_runtime_1.jsx)(exports.HighestZIndexContext.Provider, { value: value, children: children }));
};
exports.HighestZIndexProvider = HighestZIndexProvider;

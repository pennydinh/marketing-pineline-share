"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalsProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const modals_1 = require("../state/modals");
const ModalsProvider = ({ children }) => {
    const [modalContextType, setModalContextType] = (0, react_1.useState)(null);
    const modalsContext = (0, react_1.useMemo)(() => {
        return {
            selectedModal: modalContextType,
            setSelectedModal: setModalContextType,
        };
    }, [modalContextType]);
    return ((0, jsx_runtime_1.jsx)(modals_1.ModalsContext.Provider, { value: modalsContext, children: children }));
};
exports.ModalsProvider = ModalsProvider;

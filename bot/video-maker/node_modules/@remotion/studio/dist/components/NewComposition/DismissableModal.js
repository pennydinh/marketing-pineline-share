"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DismissableModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const modals_1 = require("../../state/modals");
const ModalContainer_1 = require("../ModalContainer");
const DismissableModal = ({ children }) => {
    const { setSelectedModal } = (0, react_1.useContext)(modals_1.ModalsContext);
    const onQuit = (0, react_1.useCallback)(() => {
        setSelectedModal(null);
    }, [setSelectedModal]);
    return ((0, jsx_runtime_1.jsx)(ModalContainer_1.ModalContainer, { onOutsideClick: onQuit, onEscape: onQuit, children: children }));
};
exports.DismissableModal = DismissableModal;

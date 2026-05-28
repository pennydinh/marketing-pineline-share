"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuDivider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const colors_1 = require("../../helpers/colors");
const menuDivider = {
    marginTop: 4,
    marginBottom: 4,
    height: 1,
    backgroundColor: colors_1.INPUT_BORDER_COLOR_HOVERED,
};
const MenuDivider = () => {
    return (0, jsx_runtime_1.jsx)("div", { style: menuDivider });
};
exports.MenuDivider = MenuDivider;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMenuItem = exports.VERTICAL_SCROLLBAR_CLASSNAME = exports.HORIZONTAL_SCROLLBAR_CLASSNAME = exports.MENU_ITEM_CLASSNAME = exports.MENU_INITIATOR_CLASSNAME = void 0;
exports.MENU_INITIATOR_CLASSNAME = '__remotion-studio-menu-initiator';
exports.MENU_ITEM_CLASSNAME = '__remotion-studio-menu-item';
exports.HORIZONTAL_SCROLLBAR_CLASSNAME = '__remotion-horizontal-scrollbar';
exports.VERTICAL_SCROLLBAR_CLASSNAME = '__remotion-vertical-scrollbar';
const isMenuItem = (el) => {
    return Boolean(el.classList.contains(exports.MENU_ITEM_CLASSNAME) ||
        el.closest(`.${exports.MENU_ITEM_CLASSNAME}`) ||
        el.classList.contains(exports.MENU_INITIATOR_CLASSNAME) ||
        el.closest(`.${exports.MENU_INITIATOR_CLASSNAME}`));
};
exports.isMenuItem = isMenuItem;

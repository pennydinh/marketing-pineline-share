"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdate = void 0;
const update_available_1 = require("../update-available");
const handleUpdate = async ({ remotionRoot }) => {
    const data = await (0, update_available_1.isUpdateAvailableWithTimeout)(remotionRoot);
    return data;
};
exports.handleUpdate = handleUpdate;

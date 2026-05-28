"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyText = void 0;
const copyText = (cmd) => {
    const permissionName = 'clipboard-write';
    return new Promise((resolve, reject) => {
        navigator.permissions
            .query({ name: permissionName })
            .then((result) => {
            if (result.state === 'granted' || result.state === 'prompt') {
                navigator.clipboard.writeText(cmd);
                resolve();
            }
            else {
                reject(new Error('Permission to copy not granted'));
            }
        })
            .catch((err) => {
            reject(err);
        });
    });
};
exports.copyText = copyText;

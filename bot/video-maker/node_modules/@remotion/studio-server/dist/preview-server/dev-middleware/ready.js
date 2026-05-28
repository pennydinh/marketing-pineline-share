"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ready = void 0;
function ready(context, callback) {
    if (context.state) {
        callback(context.stats);
        return;
    }
    context.callbacks.push(callback);
}
exports.ready = ready;

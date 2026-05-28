"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mitt: Tiny (~200b) functional event emitter / pubsub.
 * @name mitt
 * @returns {Mitt}
 */
function mitt(all) {
    all = all || new Map();
    return {
        /**
         * A Map of event names to registered handler functions.
         */
        all,
        /**
         * Register an event handler for the given type.
         * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
         * @param {Function} handler Function to call in response to given event
         * @memberOf mitt
         */
        on(type, handler) {
            const handlers = all === null || all === void 0 ? void 0 : all.get(type);
            const added = handlers === null || handlers === void 0 ? void 0 : handlers.push(handler);
            if (!added) {
                all === null || all === void 0 ? void 0 : all.set(type, [handler]);
            }
        },
        off(type, handler) {
            const handlers = all === null || all === void 0 ? void 0 : all.get(type);
            if (handlers) {
                // eslint-disable-next-line no-bitwise
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },
        emit(type, evt) {
            ((all === null || all === void 0 ? void 0 : all.get(type)) || [])
                .slice()
                .forEach((handler) => {
                handler(evt);
            });
            ((all === null || all === void 0 ? void 0 : all.get('*')) || [])
                .slice()
                .forEach((handler) => {
                handler(type, evt);
            });
        },
    };
}
exports.default = mitt;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
const mitt_1 = __importDefault(require("./mitt"));
class EventEmitter {
    constructor() {
        this.eventsMap = new Map();
        this.emitter = (0, mitt_1.default)(this.eventsMap);
    }
    on(event, handler) {
        this.emitter.on(event, handler);
        return this;
    }
    off(event, handler) {
        this.emitter.off(event, handler);
        return this;
    }
    addListener(event, handler) {
        this.on(event, handler);
        return this;
    }
    emit(event, eventData) {
        this.emitter.emit(event, eventData);
        return this.eventListenersCount(event) > 0;
    }
    once(event, handler) {
        const onceHandler = (eventData) => {
            handler(eventData);
            this.off(event, onceHandler);
        };
        return this.on(event, onceHandler);
    }
    listenerCount(event) {
        return this.eventListenersCount(event);
    }
    removeAllListeners(event) {
        if (event) {
            this.eventsMap.delete(event);
        }
        else {
            this.eventsMap.clear();
        }
        return this;
    }
    eventListenersCount(event) {
        var _a;
        return ((_a = this.eventsMap.get(event)) === null || _a === void 0 ? void 0 : _a.length) || 0;
    }
}
exports.EventEmitter = EventEmitter;

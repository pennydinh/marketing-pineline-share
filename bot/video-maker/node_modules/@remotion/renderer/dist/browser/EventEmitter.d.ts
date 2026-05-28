import type { EventType, Handler } from './mitt';
export interface CommonEventEmitter {
    on(event: EventType, handler: Handler): CommonEventEmitter;
    off(event: EventType, handler: Handler): CommonEventEmitter;
    addListener(event: EventType, handler: Handler): CommonEventEmitter;
    emit(event: EventType, eventData?: unknown): boolean;
    once(event: EventType, handler: Handler): CommonEventEmitter;
    listenerCount(event: string): number;
    removeAllListeners(event?: EventType): CommonEventEmitter;
}
export declare class EventEmitter implements CommonEventEmitter {
    private emitter;
    private eventsMap;
    constructor();
    on(event: EventType, handler: Handler): EventEmitter;
    off(event: EventType, handler: Handler): EventEmitter;
    addListener(event: EventType, handler: Handler): EventEmitter;
    emit(event: EventType, eventData?: unknown): boolean;
    once(event: EventType, handler: Handler): EventEmitter;
    listenerCount(event: EventType): number;
    removeAllListeners(event?: EventType): EventEmitter;
    private eventListenersCount;
}

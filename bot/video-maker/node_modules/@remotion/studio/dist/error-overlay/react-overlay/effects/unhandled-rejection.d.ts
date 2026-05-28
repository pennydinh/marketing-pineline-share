type ErrorCallback = (error: Error) => void;
declare function registerUnhandledRejection(target: EventTarget, callback: ErrorCallback): void;
declare function unregisterUnhandledRejection(target: EventTarget): void;
export { registerUnhandledRejection as register, unregisterUnhandledRejection as unregister, };

type ErrorCallback = (error: Error) => void;
declare function registerUnhandledError(target: EventTarget, callback: ErrorCallback): void;
declare function unregisterUnhandledError(target: EventTarget): void;
export { registerUnhandledError as register, unregisterUnhandledError as unregister, };

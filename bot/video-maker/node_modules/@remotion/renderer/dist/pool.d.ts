export declare class Pool<T> {
    resources: T[];
    waiters: ((r: T) => void)[];
    constructor(resources: T[]);
    acquire(): Promise<T>;
    release(resource: T): void;
}

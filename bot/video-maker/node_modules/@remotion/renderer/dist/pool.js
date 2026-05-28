"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pool = void 0;
class Pool {
    constructor(resources) {
        this.resources = resources;
        this.waiters = [];
    }
    acquire() {
        const resource = this.resources.shift();
        if (resource !== undefined) {
            return Promise.resolve(resource);
        }
        return new Promise((resolve) => {
            this.waiters.push((freeResource) => {
                resolve(freeResource);
            });
        });
    }
    release(resource) {
        const waiter = this.waiters.shift();
        if (waiter === undefined) {
            this.resources.push(resource);
        }
        else {
            waiter(resource);
        }
    }
}
exports.Pool = Pool;

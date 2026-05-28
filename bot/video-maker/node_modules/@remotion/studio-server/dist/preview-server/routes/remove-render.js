"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRemoveRender = void 0;
const handleRemoveRender = ({ input: { jobId }, methods: { removeJob }, }) => {
    removeJob(jobId);
    return Promise.resolve(undefined);
};
exports.handleRemoveRender = handleRemoveRender;

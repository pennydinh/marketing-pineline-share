"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCancelRender = void 0;
const handleCancelRender = ({ input: { jobId }, methods: { cancelJob } }) => {
    cancelJob(jobId);
    return Promise.resolve({});
};
exports.handleCancelRender = handleCancelRender;

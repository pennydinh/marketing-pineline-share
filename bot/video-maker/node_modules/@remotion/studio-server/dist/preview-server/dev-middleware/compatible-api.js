"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.send = exports.setHeaderForResponse = void 0;
function setHeaderForResponse(res, name, value) {
    res.setHeader(name, typeof value === 'number' ? String(value) : value);
}
exports.setHeaderForResponse = setHeaderForResponse;
function send(req, res, bufferOtStream, byteLength) {
    if (typeof bufferOtStream === 'string' || Buffer.isBuffer(bufferOtStream)) {
        res.end(bufferOtStream);
        return;
    }
    setHeaderForResponse(res, 'Content-Length', byteLength);
    if (req.method === 'HEAD') {
        res.end();
        return;
    }
    bufferOtStream.pipe(res);
}
exports.send = send;

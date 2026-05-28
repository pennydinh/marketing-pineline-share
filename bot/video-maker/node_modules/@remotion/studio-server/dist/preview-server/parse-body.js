"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequestBody = void 0;
const parseRequestBody = async (req) => {
    const body = await new Promise((_resolve) => {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        });
        req.on('end', () => {
            _resolve(data.toString());
        });
    });
    return JSON.parse(body);
};
exports.parseRequestBody = parseRequestBody;

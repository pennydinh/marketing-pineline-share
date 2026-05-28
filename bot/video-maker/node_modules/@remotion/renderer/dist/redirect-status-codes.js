"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redirectStatusCodes = void 0;
// Don't handle 304 status code (Not Modified) as a redirect,
// since the browser will display the right page.
exports.redirectStatusCodes = [301, 302, 303, 307, 308];

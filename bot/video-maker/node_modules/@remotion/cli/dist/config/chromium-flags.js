"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChromiumIgnoreCertificateErrors = exports.getIgnoreCertificateErrors = exports.setChromiumDisableWebSecurity = exports.getChromiumDisableWebSecurity = void 0;
let chromiumDisableWebSecurity = false;
let ignoreCertificateErrors = false;
const getChromiumDisableWebSecurity = () => chromiumDisableWebSecurity;
exports.getChromiumDisableWebSecurity = getChromiumDisableWebSecurity;
const setChromiumDisableWebSecurity = (should) => {
    chromiumDisableWebSecurity = should;
};
exports.setChromiumDisableWebSecurity = setChromiumDisableWebSecurity;
const getIgnoreCertificateErrors = () => ignoreCertificateErrors;
exports.getIgnoreCertificateErrors = getIgnoreCertificateErrors;
const setChromiumIgnoreCertificateErrors = (should) => {
    ignoreCertificateErrors = should;
};
exports.setChromiumIgnoreCertificateErrors = setChromiumIgnoreCertificateErrors;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestRemotionVersion = void 0;
const https_1 = __importDefault(require("https"));
const getPackageJsonForRemotion = () => {
    return new Promise((resolve, reject) => {
        const req = https_1.default.get('https://registry.npmjs.org/remotion', {
            headers: {
                accept: 'application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*',
            },
        }, (res) => {
            let data = '';
            res.on('data', (d) => {
                data += d;
            });
            res.on('end', () => resolve(data));
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
};
const getLatestRemotionVersion = async () => {
    const pkgJson = await getPackageJsonForRemotion();
    return JSON.parse(pkgJson)['dist-tags'].latest;
};
exports.getLatestRemotionVersion = getLatestRemotionVersion;

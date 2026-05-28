"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.yesOrNo = void 0;
const readline_1 = __importDefault(require("readline"));
const options = {
    yes: ['yes', 'y'],
    no: ['no', 'n'],
};
function defaultInvalidHandler({ yesValues, noValues, }) {
    process.stdout.write('\nInvalid Response.\n');
    process.stdout.write('Answer either yes : (' + yesValues.join(', ') + ') \n');
    process.stdout.write('Or no: (' + noValues.join(', ') + ') \n\n');
}
const yesOrNo = ({ question, defaultValue, }) => {
    const invalid = defaultInvalidHandler;
    const yesValues = options.yes.map((v) => v.toLowerCase());
    const noValues = options.no.map((v) => v.toLowerCase());
    const rl = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question(question + ' ', async (answer) => {
            rl.close();
            const cleaned = answer.trim().toLowerCase();
            if (cleaned === '' && defaultValue !== null)
                return resolve(defaultValue);
            if (yesValues.indexOf(cleaned) >= 0)
                return resolve(true);
            if (noValues.indexOf(cleaned) >= 0)
                return resolve(false);
            invalid({ question, yesValues, noValues });
            const result = await (0, exports.yesOrNo)({
                question,
                defaultValue,
            });
            resolve(result);
        });
    });
};
exports.yesOrNo = yesOrNo;

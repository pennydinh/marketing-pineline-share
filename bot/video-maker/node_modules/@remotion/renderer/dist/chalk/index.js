"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chalk = void 0;
const is_color_supported_1 = require("./is-color-supported");
exports.chalk = (() => {
    const colors = {
        enabled: () => (0, is_color_supported_1.isColorSupported)(),
        visible: true,
        styles: {},
        keys: {},
    };
    const ansi = (st) => {
        const open = `\u001b[${st.codes[0]}m`;
        const close = `\u001b[${st.codes[1]}m`;
        const regex = new RegExp(`\\u001b\\[${st.codes[1]}m`, 'g');
        st.wrap = (input, newline) => {
            if (input.includes(close))
                input = input.replace(regex, close + open);
            const output = open + input + close;
            // see https://github.com/chalk/chalk/pull/92, thanks to the
            // chalk contributors for this fix. However, we've confirmed that
            // this issue is also present in Windows terminals
            return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
        };
        return st;
    };
    const wrap = (sty, input, newline) => {
        var _a;
        return (_a = sty.wrap) === null || _a === void 0 ? void 0 : _a.call(sty, input, newline);
    };
    const style = (input, stack) => {
        if (input === '' || input === null || input === undefined)
            return '';
        if (colors.enabled() === false)
            return input;
        if (colors.visible === false)
            return '';
        let str = String(input);
        const nl = str.includes('\n');
        let n = stack.length;
        while (n-- > 0)
            str = wrap(colors.styles[stack[n]], str, nl);
        return str;
    };
    const define = (name, codes, type) => {
        colors.styles[name] = ansi({ name, codes });
        const keys = colors.keys[type] || (colors.keys[type] = []);
        keys.push(name);
        Reflect.defineProperty(colors, name, {
            configurable: true,
            enumerable: true,
            set(value) {
                var _a;
                (_a = colors.alias) === null || _a === void 0 ? void 0 : _a.call(colors, name, value);
            },
            get() {
                const color = (input) => style(input, color.stack);
                Reflect.setPrototypeOf(color, colors);
                color.stack = this.stack ? this.stack.concat(name) : [name];
                return color;
            },
        });
    };
    define('reset', [0, 0], 'modifier');
    define('bold', [1, 22], 'modifier');
    define('dim', [2, 22], 'modifier');
    define('italic', [3, 23], 'modifier');
    define('underline', [4, 24], 'modifier');
    define('inverse', [7, 27], 'modifier');
    define('hidden', [8, 28], 'modifier');
    define('strikethrough', [9, 29], 'modifier');
    define('black', [30, 39], 'color');
    define('red', [31, 39], 'color');
    define('green', [32, 39], 'color');
    define('yellow', [33, 39], 'color');
    define('blue', [34, 39], 'color');
    define('magenta', [35, 39], 'color');
    define('cyan', [36, 39], 'color');
    define('white', [37, 39], 'color');
    define('gray', [90, 39], 'color');
    define('grey', [90, 39], 'color');
    define('bgBlack', [40, 49], 'bg');
    define('bgRed', [41, 49], 'bg');
    define('bgGreen', [42, 49], 'bg');
    define('bgYellow', [43, 49], 'bg');
    define('bgBlue', [44, 49], 'bg');
    define('bgMagenta', [45, 49], 'bg');
    define('bgWhite', [47, 49], 'bg');
    define('blackBright', [90, 39], 'bright');
    define('redBright', [91, 39], 'bright');
    define('greenBright', [92, 39], 'bright');
    define('yellowBright', [93, 39], 'bright');
    define('blueBright', [94, 39], 'bright');
    define('magentaBright', [95, 39], 'bright');
    define('whiteBright', [97, 39], 'bright');
    define('bgBlackBright', [100, 49], 'bgBright');
    define('bgRedBright', [101, 49], 'bgBright');
    define('bgGreenBright', [102, 49], 'bgBright');
    define('bgYellowBright', [103, 49], 'bgBright');
    define('bgBlueBright', [104, 49], 'bgBright');
    define('bgMagentaBright', [105, 49], 'bgBright');
    define('bgWhiteBright', [107, 49], 'bgBright');
    colors.alias = (name, color) => {
        // @ts-expect-error
        const fn = colors[color];
        if (typeof fn !== 'function') {
            throw new TypeError('Expected alias to be the name of an existing color (string) or a function');
        }
        if (!fn.stack) {
            Reflect.defineProperty(fn, 'name', { value: name });
            colors.styles[name] = fn;
            fn.stack = [name];
        }
        Reflect.defineProperty(colors, name, {
            configurable: true,
            enumerable: true,
            set(value) {
                var _a;
                (_a = colors.alias) === null || _a === void 0 ? void 0 : _a.call(colors, name, value);
            },
            get() {
                const col = (input) => style(input, col.stack);
                Reflect.setPrototypeOf(col, colors);
                col.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
                return col;
            },
        });
    };
    return colors;
})();

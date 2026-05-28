"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnsiDiff = void 0;
const studio_shared_1 = require("@remotion/studio-shared");
const CLEAR_LINE = Buffer.from([0x1b, 0x5b, 0x30, 0x4b]);
const NEWLINE = Buffer.from('\n');
class AnsiDiff {
    constructor(opts) {
        this._push = (buf) => {
            this._out.push(buf);
        };
        this.x = 0;
        this.y = 0;
        this.width = (opts === null || opts === void 0 ? void 0 : opts.width) || Infinity;
        this.height = (opts === null || opts === void 0 ? void 0 : opts.height) || Infinity;
        this._buffer = null;
        this._out = [];
        this._lines = [];
        this.finished = false;
    }
    toString() {
        return this._buffer;
    }
    finish() {
        this.finished = true;
        if (this._out.length === 0) {
            return Buffer.from('');
        }
        if (!this._out[this._out.length - 1].toString().endsWith('\n')) {
            return NEWLINE;
        }
        return Buffer.from('');
    }
    update(buffer, opts) {
        if (this.finished) {
            return Buffer.from('');
        }
        this._buffer = Buffer.isBuffer(buffer) ? buffer.toString() : buffer;
        const other = this._buffer;
        const oldLines = this._lines;
        const lines = split(other, this);
        this._lines = lines;
        this._out = [];
        const min = Math.min(lines.length, oldLines.length);
        let i = 0;
        let a;
        let b;
        let scrub = false;
        for (; i < min; i++) {
            a = lines[i];
            b = oldLines[i];
            if (same(a, b))
                continue;
            // if x === width there is an edgecase with inline diffing
            // easiest solution is just not to do it then! :)
            if (!scrub && this.x !== this.width && inlineDiff(a, b)) {
                const left = a.diffLeft(b);
                const right = a.diffRight(b);
                const slice = a.raw.slice(left, right ? -right : a.length);
                if (left + right > 4 && left + slice.length < this.width - 1) {
                    this._moveTo(left, a.y);
                    this._push(Buffer.from(slice));
                    this.x += slice.length;
                    continue;
                }
            }
            this._moveTo(0, a.y);
            this._write(a);
            if (a.y !== b.y || a.height !== b.height)
                scrub = true;
            if (b.length > a.length || scrub)
                this._push(CLEAR_LINE);
            if (a.newline)
                this._newline();
        }
        for (; i < lines.length; i++) {
            a = lines[i];
            this._moveTo(0, a.y);
            this._write(a);
            if (scrub)
                this._push(CLEAR_LINE);
            if (a.newline)
                this._newline();
        }
        const oldLast = top(oldLines);
        const last = top(lines);
        if (oldLast &&
            (!last || last.y + last.height < oldLast.y + oldLast.height)) {
            this._clearDown(oldLast.y + oldLast.height);
        }
        if (opts === null || opts === void 0 ? void 0 : opts.moveTo) {
            this._moveTo(opts.moveTo[0], opts.moveTo[1]);
        }
        else if (last) {
            this._moveTo(last.remainder, last.y + last.height);
        }
        return Buffer.concat(this._out);
    }
    _clearDown(y) {
        let { x } = this;
        for (let i = this.y; i <= y; i++) {
            this._moveTo(x, i);
            this._push(CLEAR_LINE);
            x = 0;
        }
    }
    _newline() {
        this._push(NEWLINE);
        this.x = 0;
        this.y++;
    }
    _write(line) {
        this._out.push(line.toBuffer());
        this.x = line.remainder;
        this.y += line.height;
    }
    _moveTo(x, y) {
        const dx = x - this.x;
        const dy = y - this.y;
        if (dx > 0)
            this._push(moveRight(dx));
        else if (dx < 0)
            this._push(moveLeft(-dx));
        if (dy > 0)
            this._push(moveDown(dy));
        else if (dy < 0)
            this._push(moveUp(-dy));
        this.x = x;
        this.y = y;
    }
}
exports.AnsiDiff = AnsiDiff;
function same(a, b) {
    return (a.y === b.y &&
        a.width === b.width &&
        a.raw === b.raw &&
        a.newline === b.newline);
}
function top(list) {
    return list.length ? list[list.length - 1] : null;
}
class Line {
    constructor(str, y, nl, term) {
        this.y = y;
        this.width = term.width;
        this.parts = (0, studio_shared_1.splitAnsi)(str);
        this.length = length(this.parts);
        this.raw = str;
        this.newline = nl;
        this.height = Math.floor(this.length / term.width);
        this.remainder = this.length - (this.height && this.height * term.width);
        if (this.height && !this.remainder) {
            this.height--;
            this.remainder = this.width;
        }
    }
    diffLeft(other) {
        let left = 0;
        for (; left < this.length; left++) {
            if (this.raw[left] !== other.raw[left])
                return left;
        }
        return left;
    }
    diffRight(other) {
        let right = 0;
        for (; right < this.length; right++) {
            const r = this.length - right - 1;
            if (this.raw[r] !== other.raw[r])
                return right;
        }
        return right;
    }
    toBuffer() {
        return Buffer.from(this.raw);
    }
}
function inlineDiff(a, b) {
    return (a.length === b.length &&
        a.parts.length === 1 &&
        b.parts.length === 1 &&
        a.y === b.y &&
        a.newline &&
        b.newline &&
        a.width === b.width);
}
function split(str, term) {
    let y = 0;
    const lines = str.split('\n');
    const wrapped = [];
    let line;
    for (let i = 0; i < lines.length; i++) {
        line = new Line(lines[i], y, i < lines.length - 1, term);
        y += line.height + (line.newline ? 1 : 0);
        wrapped.push(line);
    }
    return wrapped;
}
function moveUp(n) {
    return Buffer.from('1b5b' + toHex(n) + '41', 'hex');
}
function moveDown(n) {
    return Buffer.from('1b5b' + toHex(n) + '42', 'hex');
}
function moveRight(n) {
    return Buffer.from('1b5b' + toHex(n) + '43', 'hex');
}
function moveLeft(n) {
    return Buffer.from('1b5b' + toHex(n) + '44', 'hex');
}
function length(parts) {
    let len = 0;
    for (let i = 0; i < parts.length; i += 2) {
        len += parts[i].length;
    }
    return len;
}
function toHex(n) {
    return Buffer.from(String(n)).toString('hex');
}

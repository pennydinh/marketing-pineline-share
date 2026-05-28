"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWebSocketTransport = void 0;
/**
 * Copyright 2018 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const node_dns_1 = require("node:dns");
const node_url_1 = require("node:url");
const ws_types_1 = require("../ws/ws-types");
class NodeWebSocketTransport {
    static async create(urlString) {
        // Starting in Node 17, IPv6 is favoured over IPv4 due to a change
        // in a default option:
        // - https://github.com/nodejs/node/issues/40537,
        // Due to this, for Firefox, we must parse and resolve the `localhost` hostname
        // manually with the previous behavior according to:
        // - https://nodejs.org/api/dns.html#dnslookuphostname-options-callback
        // because of https://bugzilla.mozilla.org/show_bug.cgi?id=1769994.
        const url = new node_url_1.URL(urlString);
        if (url.hostname === 'localhost') {
            const { address } = await node_dns_1.promises.lookup(url.hostname, { verbatim: false });
            url.hostname = address;
        }
        return new Promise((resolve, reject) => {
            const ws = new ws_types_1.ws(url, [], {
                followRedirects: true,
                perMessageDeflate: false,
                maxPayload: 1024 * 1024 * 1024, // 1024Mb
                headers: {
                    'User-Agent': `Remotion CLI`,
                },
            });
            ws.addEventListener('open', () => {
                return resolve(new NodeWebSocketTransport(ws));
            });
            ws.addEventListener('error', reject);
        });
    }
    constructor(ws) {
        this.websocket = ws;
        this.websocket.addEventListener('message', (event) => {
            if (this.onmessage) {
                this.onmessage.call(null, event.data);
            }
        });
        this.websocket.addEventListener('close', () => {
            if (this.onclose) {
                this.onclose.call(null);
            }
        });
        // Silently ignore all errors - we don't know what to do with them.
        this.websocket.addEventListener('error', () => undefined);
    }
    send(message) {
        this.websocket.send(message);
    }
    close() {
        this.websocket.close();
    }
    forgetEventLoop() {
        // @ts-expect-error
        this.websocket._socket.unref();
    }
    rememberEventLoop() {
        // @ts-expect-error
        this.websocket._socket.ref();
    }
}
exports.NodeWebSocketTransport = NodeWebSocketTransport;

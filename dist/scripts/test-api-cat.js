"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/products?category=tshirts',
    method: 'GET'
};
const req = http_1.default.request(options, res => {
    let data = '';
    res.on('data', chunk => {
        data += chunk;
    });
    res.on('end', () => {
        console.log('Response:', JSON.stringify(JSON.parse(data), null, 2));
    });
});
req.on('error', error => {
    console.error('Error:', error.message);
});
req.end();
//# sourceMappingURL=test-api-cat.js.map
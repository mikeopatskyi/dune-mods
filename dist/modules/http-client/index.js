"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = exports.createHttpClient = exports.httpClientMethods = void 0;
var http_client_methods_1 = require("./http-client-methods");
Object.defineProperty(exports, "httpClientMethods", { enumerable: true, get: function () { return __importDefault(http_client_methods_1).default; } });
var http_client_fn_1 = require("./http-client.fn");
Object.defineProperty(exports, "createHttpClient", { enumerable: true, get: function () { return __importDefault(http_client_fn_1).default; } });
var http_client_class_1 = require("./http-client.class");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return __importDefault(http_client_class_1).default; } });
//# sourceMappingURL=index.js.map
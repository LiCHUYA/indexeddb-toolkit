"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var tslib_1 = require("tslib");
// 判断是否为生产环境的简单方法
var isProduction = function () {
    try {
        return window.location.hostname !== 'localhost' &&
            window.location.hostname !== '127.0.0.1';
    }
    catch (_a) {
        return false;
    }
};
exports.logger = {
    debug: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!isProduction()) {
            console.debug.apply(console, tslib_1.__spreadArray(['[IndexedDB Toolkit]'], args, false));
        }
    },
    error: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!isProduction()) {
            console.error.apply(console, tslib_1.__spreadArray(['[IndexedDB Toolkit]'], args, false));
        }
    },
    warn: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!isProduction()) {
            console.warn.apply(console, tslib_1.__spreadArray(['[IndexedDB Toolkit]'], args, false));
        }
    }
};
//# sourceMappingURL=logger.js.map
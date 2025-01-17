"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAllConnections = exports.isTableExist = exports.getAllDB = exports.closeCurrentConnection = exports.getIndexedDBVersion = void 0;
var tslib_1 = require("tslib");
var getIndexedDBVersion_1 = tslib_1.__importDefault(require("./getIndexedDBVersion"));
exports.getIndexedDBVersion = getIndexedDBVersion_1.default;
var closeCurrentConnection_1 = tslib_1.__importDefault(require("./closeCurrentConnection"));
exports.closeCurrentConnection = closeCurrentConnection_1.default;
var getAllDB_1 = tslib_1.__importDefault(require("./getAllDB"));
exports.getAllDB = getAllDB_1.default;
var isTableExist_1 = tslib_1.__importDefault(require("./isTableExist"));
exports.isTableExist = isTableExist_1.default;
var closeAllConnections_1 = tslib_1.__importDefault(require("./closeAllConnections"));
exports.closeAllConnections = closeAllConnections_1.default;
//# sourceMappingURL=index.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = require("../index");
/**
 * 删除所有表
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteAllTables(dbName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var database, currentDb, objectStoreNames, deletePromises;
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 1:
                    database = _b.sent();
                    currentDb = database.result.target.result;
                    objectStoreNames = Array.from((_a = currentDb === null || currentDb === void 0 ? void 0 : currentDb.objectStoreNames) !== null && _a !== void 0 ? _a : []);
                    deletePromises = objectStoreNames.map(function (tableName) {
                        return (0, index_1.deleteTable)(dbName, tableName);
                    });
                    return [2 /*return*/, Promise.all(deletePromises)];
            }
        });
    });
}
exports.default = deleteAllTables;
//# sourceMappingURL=deleteAllTables.js.map
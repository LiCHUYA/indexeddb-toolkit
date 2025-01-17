"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
/**
 * 根据索引删除单条数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteOneByIndex(dbName, tableName, indexName, indexValue) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tableExist, db_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    if (!tableName) {
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()];
                    }
                    if (!indexName) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_NAME_IS_NULL()];
                    }
                    if (!indexValue) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_VALUE_IS_NULL()];
                    }
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    db_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var transaction = db_1.transaction([tableName], 'readwrite');
                            var store = transaction.objectStore(tableName);
                            var index = store.index(indexName);
                            var request = index.openCursor(IDBKeyRange.only(indexValue));
                            request.onsuccess = function (event) {
                                var cursor = event.target.result;
                                if (cursor) {
                                    var deleteRequest = cursor.delete();
                                    deleteRequest.onsuccess = function () {
                                        resolve(constant_1.default.TB_DELETE_BY_INDEX_SUCCESS({ id: cursor.primaryKey }));
                                    };
                                    deleteRequest.onerror = function (event) {
                                        reject(constant_1.default.TB_DELETE_BY_INDEX_ERROR(event));
                                    };
                                }
                                else {
                                    resolve(constant_1.default.TB_DELETE_BY_INDEX_SUCCESS(null));
                                }
                            };
                            request.onerror = function (event) {
                                reject(constant_1.default.TB_DELETE_BY_INDEX_ERROR(event));
                            };
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = deleteOneByIndex;
//# sourceMappingURL=deleteOneByIndex.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
/**
 * 根据索引查询数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param isAll 根据索引查询出来的值,查出来全部值还是默认第一条
 * @returns Promise对象，包含查询结果对象
 */
function findByIndex(dbName_1, tableName_1, indexName_1, indexValue_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, indexName, indexValue, isAll) {
        var tableExist, db_1, error_1;
        if (isAll === void 0) { isAll = true; }
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
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_EXIST("".concat(tableName, " \u8868\u4E0D\u5B58\u5728"))];
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    db_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = db_1.transaction(tableName, 'readonly').objectStore(tableName);
                            if (!Array.from(store.indexNames).includes(indexName))
                                reject(constant_1.default.TB_INDEX_ERROR());
                            var index = store.index(indexName);
                            if (isAll) {
                                var request = index.openCursor(IDBKeyRange.only(indexValue));
                                var results_1 = [];
                                request.onsuccess = function (event) {
                                    var cursor = event.target.result;
                                    if (cursor) {
                                        results_1.push(cursor.value);
                                        cursor.continue();
                                    }
                                    else {
                                        resolve(constant_1.default.TB_SELECT_BY_INDEX_SUCCESS(results_1));
                                    }
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                            else {
                                var request = index.get(indexValue);
                                request.onsuccess = function (event) {
                                    var result = event.target.result;
                                    resolve(constant_1.default.TB_SELECT_BY_INDEX_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_INDEX_ERROR(event));
                                };
                            }
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = findByIndex;
//# sourceMappingURL=findByIndex.js.map
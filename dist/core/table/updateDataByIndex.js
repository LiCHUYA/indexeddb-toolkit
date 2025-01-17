"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
/**
 * 根据索引更新数据
 * @param dbName 数据库名称
 * @param tbName 表名称
 * @param indexName 索引名称
 * @param indexValue 索引值
 * @param data 更新的数据
 * @returns Promise对象，包含更新结果
 */
function updateDataByIndex(dbName, tbName, indexName, indexValue, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tableExist, db_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    if (!indexName) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_NAME_IS_NULL()];
                    }
                    if (!indexValue) {
                        return [2 /*return*/, constant_1.default.TB_SELECT_INDEX_VALUE_IS_NULL()];
                    }
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tbName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_NOTFOUND()];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    db_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = db_1.transaction([tbName], 'readwrite').objectStore(tbName);
                            var index = store.index(indexName);
                            var request = index.get(indexValue);
                            request.onsuccess = function (event) {
                                var target = event.target;
                                var item = target.result;
                                if (item) {
                                    var updatedItem = tslib_1.__assign(tslib_1.__assign({}, item), data);
                                    var updateRequest = store.put(updatedItem);
                                    updateRequest.onsuccess = function (event) {
                                        resolve(constant_1.default.TB_DATA_UPDATE_BY_INDEX_SUCCESS(event));
                                    };
                                    updateRequest.onerror = function (event) {
                                        reject(constant_1.default.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
                                    };
                                }
                                else {
                                    reject(constant_1.default.DATA_ERROR('找不到数据'));
                                }
                            };
                            request.onerror = function (event) {
                                reject(constant_1.default.TB_DATA_UPDATE_BY_INDEX_ERROR(event));
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
exports.default = updateDataByIndex;
//# sourceMappingURL=updateDataByIndex.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
/**
 * 查询指定数据库中的数据，如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据。
 * @async
 * @param {string} dbName - 数据库名称
 * @param {string} [tableName] - 可选，表名。如果提供了表名，则查询该表的数据；如果未提供表名，则查询所有表的数据
 * @returns {Promise<TableData[] | IReturn>} 返回包含查询结果的Promise对象
 */
function findDBData(dbName, tableName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var database_1, result, queryTableData_1, tableExist, tableData, objectStoreNames, tableDataPromises, tableDataResults, error_1;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 2:
                    database_1 = _a.sent();
                    result = [];
                    queryTableData_1 = function (storeName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var transaction, store_1, data, error_2;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, , 3]);
                                    transaction = database_1.transaction([storeName], 'readonly');
                                    store_1 = transaction.objectStore(storeName);
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var request = store_1.getAll();
                                            request.onsuccess = function () { return resolve(request.result); };
                                            request.onerror = function (event) { return reject(event); };
                                        })];
                                case 1:
                                    data = _a.sent();
                                    return [2 /*return*/, {
                                            tableName: storeName,
                                            version: database_1.version || '',
                                            children: constant_1.default.TB_SELECT_SUCCESS(data)
                                        }];
                                case 2:
                                    error_2 = _a.sent();
                                    logger_1.logger.error("\u67E5\u8BE2\u8868 ".concat(storeName, " \u6570\u636E\u5931\u8D25:"), error_2);
                                    return [2 /*return*/, null];
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!tableName) return [3 /*break*/, 5];
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 3:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_NOTFOUND()];
                    }
                    return [4 /*yield*/, queryTableData_1(tableName)];
                case 4:
                    tableData = _a.sent();
                    if (tableData) {
                        result.push(tableData);
                    }
                    return [2 /*return*/, result];
                case 5:
                    objectStoreNames = Array.from(database_1.objectStoreNames || []);
                    if (objectStoreNames.length === 0) {
                        return [2 /*return*/, []];
                    }
                    tableDataPromises = objectStoreNames.map(function (storeName) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        return tslib_1.__generator(this, function (_a) {
                            if (!database_1.objectStoreNames.contains(storeName)) {
                                logger_1.logger.warn("\u8868 ".concat(storeName, " \u4E0D\u5B58\u5728"));
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, queryTableData_1(storeName)];
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(tableDataPromises)
                        // 过滤掉查询失败的表数据
                    ];
                case 6:
                    tableDataResults = _a.sent();
                    // 过滤掉查询失败的表数据
                    result.push.apply(result, tableDataResults.filter(function (data) { return data !== null; }));
                    return [2 /*return*/, result];
                case 7:
                    error_1 = _a.sent();
                    logger_1.logger.error('查询数据库数据失败:', error_1);
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.default = findDBData;
//# sourceMappingURL=findDBData.js.map
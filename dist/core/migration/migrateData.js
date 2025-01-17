"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
var index_2 = require("../index");
function migrateData(fromDB_1, toDB_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (fromDB, toDB, options) {
        var sourceData, tables, existingTablesResult, existingTables_1, tablesToCreate, _i, tablesToCreate_1, table, targetDB, totalRecords, _loop_1, _a, sourceData_1, table, result, error_1;
        var _b;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, (0, index_2.findDBData)(fromDB)];
                case 1:
                    sourceData = _c.sent();
                    console.log('源数据:', sourceData);
                    if (!sourceData || !Array.isArray(sourceData)) {
                        return [2 /*return*/, constant_1.default.TB_MIGRATE_ERROR('源数据库为空')];
                    }
                    tables = sourceData.map(function (table) { return ({
                        name: table.tableName,
                        version: table.version || 1
                    }); });
                    if (!tables.length) {
                        return [2 /*return*/, constant_1.default.TB_MIGRATE_ERROR('源数据库没有表')];
                    }
                    return [4 /*yield*/, (0, index_1.getTableNames)(toDB)];
                case 2:
                    existingTablesResult = _c.sent();
                    existingTables_1 = (existingTablesResult === null || existingTablesResult === void 0 ? void 0 : existingTablesResult.result) || [];
                    tablesToCreate = tables.filter(function (table) { return !existingTables_1.includes(table.name); });
                    if (!(tablesToCreate.length > 0)) return [3 /*break*/, 6];
                    logger_1.logger.debug("\u9700\u8981\u521B\u5EFA ".concat(tablesToCreate.length, " \u4E2A\u8868"));
                    _i = 0, tablesToCreate_1 = tablesToCreate;
                    _c.label = 3;
                case 3:
                    if (!(_i < tablesToCreate_1.length)) return [3 /*break*/, 6];
                    table = tablesToCreate_1[_i];
                    return [4 /*yield*/, (0, index_1.createTable)(toDB, table.name, { version: table.version })];
                case 4:
                    _c.sent();
                    logger_1.logger.debug("\u8868 ".concat(table.name, " \u521B\u5EFA\u6210\u529F"));
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, (0, index_1.useDatabase)(toDB)
                    // 6. 遍历每个表进行数据迁移
                ];
                case 7:
                    targetDB = _c.sent();
                    totalRecords = 0;
                    _loop_1 = function (table) {
                        var tableName, tableData, transaction, store_1, error_2;
                        return tslib_1.__generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    _d.trys.push([0, 4, , 5]);
                                    tableName = table.tableName;
                                    // 读取阶段
                                    if (options.onProgress) {
                                        options.onProgress({
                                            phase: 'reading',
                                            current: sourceData.indexOf(table),
                                            total: sourceData.length,
                                            percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
                                            message: "\u6B63\u5728\u8BFB\u53D6\u8868 ".concat(tableName, " \u7684\u6570\u636E")
                                        });
                                    }
                                    tableData = ((_b = table.children) === null || _b === void 0 ? void 0 : _b.result) || [];
                                    if (!Array.isArray(tableData)) {
                                        logger_1.logger.warn("\u8868 ".concat(tableName, " \u7684\u6570\u636E\u4E0D\u662F\u6570\u7EC4\uFF0C\u8DF3\u8FC7"));
                                        return [2 /*return*/, "continue"];
                                    }
                                    // 数据转换
                                    if (options.transform) {
                                        tableData = options.transform(tableData);
                                    }
                                    // 写入阶段
                                    if (options.onProgress) {
                                        options.onProgress({
                                            phase: 'writing',
                                            current: sourceData.indexOf(table),
                                            total: sourceData.length,
                                            percentage: Math.round((sourceData.indexOf(table) / sourceData.length) * 100),
                                            message: "\u6B63\u5728\u5199\u5165\u8868 ".concat(tableName, " \u7684\u6570\u636E")
                                        });
                                    }
                                    transaction = targetDB.transaction(tableName, 'readwrite');
                                    store_1 = transaction.objectStore(tableName);
                                    if (!options.overwrite) return [3 /*break*/, 2];
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var request = store_1.clear();
                                            request.onsuccess = function () { return resolve(undefined); };
                                            request.onerror = function () { return reject(request.error); };
                                        })];
                                case 1:
                                    _d.sent();
                                    _d.label = 2;
                                case 2: 
                                // 批量写入数据
                                return [4 /*yield*/, Promise.all(tableData.map(function (item) {
                                        return new Promise(function (resolve, reject) {
                                            var request = store_1.add(item);
                                            request.onsuccess = function () { return resolve(undefined); };
                                            request.onerror = function () { return reject(request.error); };
                                        });
                                    }))];
                                case 3:
                                    // 批量写入数据
                                    _d.sent();
                                    totalRecords += tableData.length;
                                    logger_1.logger.debug("\u8868 ".concat(tableName, " \u8FC1\u79FB\u5B8C\u6210\uFF0C\u5171\u8FC1\u79FB ").concat(tableData.length, " \u6761\u8BB0\u5F55"));
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_2 = _d.sent();
                                    logger_1.logger.error("\u8FC1\u79FB\u8868 ".concat(table.tableName, " \u5931\u8D25:"), error_2);
                                    throw error_2;
                                case 5: return [2 /*return*/];
                            }
                        });
                    };
                    _a = 0, sourceData_1 = sourceData;
                    _c.label = 8;
                case 8:
                    if (!(_a < sourceData_1.length)) return [3 /*break*/, 11];
                    table = sourceData_1[_a];
                    return [5 /*yield**/, _loop_1(table)];
                case 9:
                    _c.sent();
                    _c.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 8];
                case 11:
                    // 7. 关闭目标数据库连接
                    targetDB.close();
                    result = {
                        fromDB: fromDB,
                        toDB: toDB,
                        tables: tables.map(function (t) { return t.name; }),
                        totalRecords: totalRecords
                    };
                    logger_1.logger.debug('数据迁移成功:', result);
                    return [2 /*return*/, constant_1.default.TB_MIGRATE_SUCCESS(result)];
                case 12:
                    error_1 = _c.sent();
                    logger_1.logger.error('数据迁移失败:', error_1);
                    return [2 /*return*/, constant_1.default.TB_MIGRATE_ERROR(error_1)];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = migrateData;
//# sourceMappingURL=migrateData.js.map
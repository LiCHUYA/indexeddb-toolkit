"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
function importFromJson(dbName_1, jsonData_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, jsonData, options) {
        var _a, overwrite, onProgress, importData, tables, data, db, totalRecords, _loop_1, _i, _b, _c, tableName, tableData, error_1;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 6, , 7]);
                    _a = options.overwrite, overwrite = _a === void 0 ? false : _a, onProgress = options.onProgress;
                    importData = JSON.parse(jsonData);
                    tables = importData.tables, data = importData.data;
                    if (!tables || !data) {
                        throw new Error('无效的JSON数据格式');
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 1:
                    db = _d.sent();
                    totalRecords = 0;
                    _loop_1 = function (tableName, tableData) {
                        var transaction, store_1, error_2;
                        return tslib_1.__generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    _e.trys.push([0, 7, , 8]);
                                    // 进度通知 - 准备阶段
                                    if (onProgress) {
                                        onProgress({
                                            phase: 'preparing',
                                            current: tables.indexOf(tableName),
                                            total: tables.length,
                                            percentage: Math.round((tables.indexOf(tableName) / tables.length) * 100),
                                            message: "\u6B63\u5728\u51C6\u5907\u5BFC\u5165\u8868 ".concat(tableName)
                                        });
                                    }
                                    if (!!db.objectStoreNames.contains(tableName)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, index_1.createTable)(dbName, tableName)];
                                case 1:
                                    _e.sent();
                                    _e.label = 2;
                                case 2:
                                    transaction = db.transaction(tableName, 'readwrite');
                                    store_1 = transaction.objectStore(tableName);
                                    if (!overwrite) return [3 /*break*/, 4];
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var request = store_1.clear();
                                            request.onsuccess = function () { return resolve(undefined); };
                                            request.onerror = function () { return reject(request.error); };
                                        })];
                                case 3:
                                    _e.sent();
                                    _e.label = 4;
                                case 4:
                                    if (!Array.isArray(tableData)) return [3 /*break*/, 6];
                                    return [4 /*yield*/, Promise.all(tableData.map(function (item) {
                                            return new Promise(function (resolve, reject) {
                                                var request = store_1.add(item);
                                                request.onsuccess = function () { return resolve(undefined); };
                                                request.onerror = function () { return reject(request.error); };
                                            });
                                        }))];
                                case 5:
                                    _e.sent();
                                    totalRecords += tableData.length;
                                    _e.label = 6;
                                case 6:
                                    // 进度通知 - 导入阶段
                                    if (onProgress) {
                                        onProgress({
                                            phase: 'importing',
                                            current: tables.indexOf(tableName) + 1,
                                            total: tables.length,
                                            percentage: Math.round(((tables.indexOf(tableName) + 1) / tables.length) * 100),
                                            message: "\u8868 ".concat(tableName, " \u5BFC\u5165\u5B8C\u6210")
                                        });
                                    }
                                    return [3 /*break*/, 8];
                                case 7:
                                    error_2 = _e.sent();
                                    logger_1.logger.error("\u5BFC\u5165\u8868 ".concat(tableName, " \u5931\u8D25:"), error_2);
                                    throw error_2;
                                case 8: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, _b = Object.entries(data);
                    _d.label = 2;
                case 2:
                    if (!(_i < _b.length)) return [3 /*break*/, 5];
                    _c = _b[_i], tableName = _c[0], tableData = _c[1];
                    return [5 /*yield**/, _loop_1(tableName, tableData)];
                case 3:
                    _d.sent();
                    _d.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, constant_1.default.JSON_IMPORT_SUCCESS({
                        tables: tables,
                        totalRecords: totalRecords
                    })];
                case 6:
                    error_1 = _d.sent();
                    logger_1.logger.error('导入JSON失败:', error_1);
                    return [2 /*return*/, constant_1.default.JSON_IMPORT_ERROR(error_1)];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.default = importFromJson;
//# sourceMappingURL=importFromJson.js.map
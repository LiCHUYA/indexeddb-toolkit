"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMany = insertMany;
var tslib_1 = require("tslib");
var index_1 = require("../index");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
// import { any } from './types'
/**
 * 批量插入数据
 * @param dbName 数据库名称
 * @param tableName 表名
 * @param data 要插入的数据数组
 * @param options 插入选项
 * @returns Promise<any>
 */
function insertMany(dbName_1, tableName_1, data_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, data, options) {
        var result, db, transaction, store_1, error_1;
        var _this = this;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = {
                        success: true,
                        inserted: 0,
                        failed: 0,
                        errors: []
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 2:
                    db = _a.sent();
                    transaction = db.transaction([tableName], 'readwrite');
                    store_1 = transaction.objectStore(tableName);
                    // 使用Promise.all处理所有插入操作
                    return [4 /*yield*/, Promise.all(data.map(function (item) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var keyPath, finalData_1, error_2;
                            var _a;
                            return tslib_1.__generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 5, , 6]);
                                        keyPath = store_1.keyPath;
                                        if (!(keyPath in item)) {
                                            if (!store_1.autoIncrement) {
                                                finalData_1 = tslib_1.__assign((_a = {}, _a[keyPath] = Date.now(), _a), item);
                                            }
                                            else {
                                                finalData_1 = item;
                                            }
                                        }
                                        else {
                                            finalData_1 = item;
                                        }
                                        if (!options.updateDuplicates) return [3 /*break*/, 2];
                                        // 如果选择更新重复项，使用put
                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                var request = store_1.put(finalData_1);
                                                request.onsuccess = function () { return resolve(undefined); };
                                                request.onerror = function () { return reject(request.error); };
                                            })];
                                    case 1:
                                        // 如果选择更新重复项，使用put
                                        _b.sent();
                                        return [3 /*break*/, 4];
                                    case 2: 
                                    // 否则使用add，可能会抛出重复键错误
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var request = store_1.add(finalData_1);
                                            request.onsuccess = function () { return resolve(undefined); };
                                            request.onerror = function (event) {
                                                var error = request.error;
                                                if ((error === null || error === void 0 ? void 0 : error.name) === 'ConstraintError' && options.skipDuplicates) {
                                                    // 如果是重复键错误且设置了跳过重复，则忽略错误
                                                    resolve(undefined);
                                                }
                                                else {
                                                    reject(error);
                                                }
                                            };
                                        })];
                                    case 3:
                                        // 否则使用add，可能会抛出重复键错误
                                        _b.sent();
                                        _b.label = 4;
                                    case 4:
                                        result.inserted++;
                                        return [3 /*break*/, 6];
                                    case 5:
                                        error_2 = _b.sent();
                                        result.failed++;
                                        result.errors.push({
                                            item: item,
                                            error: error_2 instanceof Error ? error_2.message : String(error_2)
                                        });
                                        if (!options.skipDuplicates && !options.updateDuplicates) {
                                            throw error_2; // 如果没有设置跳过或更新重复项，则抛出错误
                                        }
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 3:
                    // 使用Promise.all处理所有插入操作
                    _a.sent();
                    return [2 /*return*/, constant_1.default.TB_INSERT_SUCCESS(result)];
                case 4:
                    error_1 = _a.sent();
                    result.success = false;
                    return [2 /*return*/, constant_1.default.TB_INSERT_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = insertMany;
//# sourceMappingURL=insertMany.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
// import {ExportConverter} from "typedoc/dist/lib/converter/nodes";
/**
 * 根据主键查询数据或查询所有数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param key 主键值
 * @param isAll 是否查询所有数据，默认为 true
 * @returns Promise对象，包含查询结果对象
 */
function findByKey(dbName_1, tableName_1, key_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, key, isAll) {
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
                    if (!key && !isAll) {
                        return [2 /*return*/, constant_1.default.PRIMARY_KEY_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 2:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_NOTFOUND()];
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 3:
                    db_1 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var store = db_1.transaction(tableName, 'readonly').objectStore(tableName);
                            if (isAll) {
                                var request = store.getAll();
                                request.onsuccess = function (event) {
                                    var result = event.target.result;
                                    resolve(constant_1.default.TB_SELECT_BY_KEY_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_KEY_ERROR(event));
                                };
                            }
                            else {
                                var request = store.get(key);
                                request.onsuccess = function (event) {
                                    var result = event.target.result;
                                    resolve(constant_1.default.TB_SELECT_BY_KEY_SUCCESS(result));
                                };
                                request.onerror = function (event) {
                                    reject(constant_1.default.TB_SELECT_BY_KEY_ERROR(event));
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
exports.default = findByKey;
//# sourceMappingURL=findByKey.js.map
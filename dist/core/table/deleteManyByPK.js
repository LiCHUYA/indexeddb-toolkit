"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
/**
 * 根据主键数组批量删除数据
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @param keys 主键值数组
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteManyByPK(dbName, tableName, keys) {
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
                    if (!keys || keys.length === 0) {
                        return [2 /*return*/, constant_1.default.PRIMARY_KEY_IS_NULL()];
                    }
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
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
                            var store = db_1.transaction([tableName], 'readwrite').objectStore(tableName);
                            var deletePromises = keys.map(function (key) {
                                return new Promise(function (resolve, reject) {
                                    var request = store.delete(key);
                                    request.onsuccess = function () { return resolve(); };
                                    request.onerror = function (event) {
                                        return reject(constant_1.default.TB_DELETE_BY_PK_ERROR(event.target.error));
                                    };
                                });
                            });
                            Promise.all(deletePromises)
                                .then(function () {
                                return resolve(constant_1.default.TB_DELETE_BY_PK_SUCCESS("".concat(keys.length, " \u6761\u6570\u636E\u5220\u9664\u6210\u529F")));
                            })
                                .catch(function (error) { return reject(constant_1.default.TB_DELETE_BY_PK_ERROR(error)); });
                        })];
                case 4:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = deleteManyByPK;
//# sourceMappingURL=deleteManyByPK.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("../core");
/**
 * 关闭当前数据库连接
 * @param {string} dbName 数据库名称
 * @returns {Promise<void>}
 */
function closeCurrentConnection(dbName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var db, stores, _loop_1, _i, stores_1, storeName, err_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, (0, core_1.useDatabase)(dbName)];
                case 1:
                    db = _a.sent();
                    if (!db) {
                        return [2 /*return*/]; // 如果没有活动连接，直接返回
                    }
                    if (!(db.objectStoreNames && db.objectStoreNames.length > 0)) return [3 /*break*/, 8];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    stores = Array.from(db.objectStoreNames);
                    _loop_1 = function (storeName) {
                        var transaction;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    transaction = db.transaction(storeName, 'readonly');
                                    return [4 /*yield*/, new Promise(function (resolve) {
                                            transaction.oncomplete = resolve;
                                            transaction.onerror = resolve;
                                            transaction.onabort = resolve;
                                        })];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, stores_1 = stores;
                    _a.label = 3;
                case 3:
                    if (!(_i < stores_1.length)) return [3 /*break*/, 6];
                    storeName = stores_1[_i];
                    return [5 /*yield**/, _loop_1(storeName)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.warn('等待事务完成时出错:', err_1);
                    return [3 /*break*/, 8];
                case 8:
                    // 关闭数据库连接
                    if (typeof db.close === 'function') {
                        db.close();
                    }
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.warn('关闭数据库连接时出错:', error_1);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.default = closeCurrentConnection;
//# sourceMappingURL=closeCurrentConnection.js.map
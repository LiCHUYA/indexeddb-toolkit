"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var helper_1 = require("../../helper");
var index_1 = require("../index");
// 插入一条数据到指定表
function insertOne(dbName, tableName, data) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var tableExist, db;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 1:
                    tableExist = _a.sent();
                    if (!tableExist) {
                        return [2 /*return*/, constant_1.default.TB_NOTFOUND()];
                    }
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)
                        // 返回一个新的Promise
                    ];
                case 2:
                    db = _a.sent();
                    // 返回一个新的Promise
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var _a;
                            // 开启一个读写事务
                            var transaction = db.transaction([tableName], 'readwrite');
                            var store = transaction.objectStore(tableName);
                            // 获取主键名
                            var keyPath = store.keyPath;
                            // 如果数据中没有主键，且是自增主键，则不添加id
                            // 如果数据中没有主键，且不是自增主键，则添加id
                            var finalData;
                            if (!(keyPath in data)) {
                                if (!store.autoIncrement) {
                                    finalData = tslib_1.__assign((_a = {}, _a[keyPath] = Date.now(), _a), data);
                                }
                                else {
                                    finalData = data;
                                }
                            }
                            else {
                                finalData = data;
                            }
                            // 添加数据
                            var request = store.add(finalData);
                            // 成功时的处理
                            request.onsuccess = function (event) {
                                resolve(constant_1.default.TB_INSERT_SUCCESS(event));
                            };
                            // 失败时的处理
                            request.onerror = function (event) {
                                reject(constant_1.default.TB_INSERT_ERROR(event));
                            };
                        })];
            }
        });
    });
}
exports.default = insertOne;
//# sourceMappingURL=insertOne.js.map
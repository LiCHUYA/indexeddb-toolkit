"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexType = void 0;
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var index_1 = require("../index");
var logger_1 = require("../../utils/logger");
var helper_1 = require("../../helper");
/**
 * 索引类型枚举
 */
var IndexType;
(function (IndexType) {
    IndexType["UNIQUE"] = "unique";
    IndexType["MULTI_ENTRY"] = "multi";
    IndexType["NORMAL"] = "normal"; // 普通索引
})(IndexType || (exports.IndexType = IndexType = {}));
/**
 * 创建数据库表
 * @description
 * 创建一个新的 IndexedDB 对象仓库并配置索引。
 * 支持唯一索引和多值索引。
 *
 * @example
 * ```typescript
 * // 创建用户表 - 简单方式
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: ['email', 'name', 'tags'] // 默认为普通索引
 * })
 *
 * // 创建用户表 - 高级配置
 * await createTable('myDB', 'users', {
 *   primaryKey: 'userId',
 *   indexes: [
 *     'name',                          // 普通索引
 *     {
 *       name: 'email',
 *       type: IndexType.UNIQUE         // 唯一索引
 *     },
 *     {
 *       name: 'tags',
 *       type: IndexType.MULTI_ENTRY    // 多值索引，用于数组字段
 *     }
 *   ]
 * })
 * ```
 */
function createTable(dbName_1, tableName_1) {
    return tslib_1.__awaiter(this, arguments, void 0, function (dbName, tableName, options) {
        var _a, primaryKey_1, _b, autoIncrement_1, _c, indexes_1, _d, timeout_1, _e, force_1, exists, db, newVersion_1, error_1;
        var _this = this;
        if (options === void 0) { options = {}; }
        return tslib_1.__generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 3, , 4]);
                    _a = options.primaryKey, primaryKey_1 = _a === void 0 ? 'id' : _a, _b = options.autoIncrement, autoIncrement_1 = _b === void 0 ? true : _b, _c = options.indexes, indexes_1 = _c === void 0 ? [] : _c, _d = options.timeout, timeout_1 = _d === void 0 ? 3000 : _d, _e = options.force, force_1 = _e === void 0 ? true : _e;
                    // 参数验证
                    if (!dbName)
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    if (!tableName)
                        return [2 /*return*/, constant_1.default.TBNAME_IS_NULL()
                            // 检查表是否存在
                        ];
                    return [4 /*yield*/, (0, helper_1.isTableExist)(dbName, tableName)];
                case 1:
                    exists = _f.sent();
                    if (exists)
                        return [2 /*return*/, constant_1.default.TB_EXIST(tableName)
                            // 获取数据库连接
                        ];
                    return [4 /*yield*/, (0, index_1.useDatabase)(dbName)];
                case 2:
                    db = _f.sent();
                    newVersion_1 = db.version + 1;
                    db.close();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var openRequest = window.indexedDB.open(dbName, newVersion_1);
                            var timeoutId;
                            // 设置超时处理
                            if (timeout_1 > 0) {
                                timeoutId = setTimeout(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var retryRequest, err_1;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                if (!force_1) return [3 /*break*/, 5];
                                                _a.label = 1;
                                            case 1:
                                                _a.trys.push([1, 3, , 4]);
                                                return [4 /*yield*/, (0, helper_1.closeAllConnections)()];
                                            case 2:
                                                _a.sent();
                                                retryRequest = window.indexedDB.open(dbName, newVersion_1);
                                                setupHandlers(retryRequest);
                                                return [3 /*break*/, 4];
                                            case 3:
                                                err_1 = _a.sent();
                                                reject(constant_1.default.TB_CREATE_ERROR(err_1));
                                                return [3 /*break*/, 4];
                                            case 4: return [3 /*break*/, 6];
                                            case 5:
                                                reject(constant_1.default.TB_CREATE_ERROR('创建表超时'));
                                                _a.label = 6;
                                            case 6: return [2 /*return*/];
                                        }
                                    });
                                }); }, timeout_1);
                            }
                            var setupHandlers = function (request) {
                                request.onblocked = function () {
                                    logger_1.logger.warn('数据库升级被阻塞 - 等待其他连接关闭');
                                    // 阻塞时不立即失败,等待超时或强制处理
                                };
                                request.onupgradeneeded = function (event) {
                                    clearTimeout(timeoutId);
                                    var database = event.target.result;
                                    try {
                                        var store_1 = database.createObjectStore(tableName, {
                                            keyPath: primaryKey_1,
                                            autoIncrement: autoIncrement_1
                                        });
                                        indexes_1.forEach(function (index) {
                                            var indexConfig = {};
                                            if (typeof index === 'string') {
                                                store_1.createIndex(index, index, indexConfig);
                                                logger_1.logger.debug("\u521B\u5EFA\u666E\u901A\u7D22\u5F15: ".concat(index));
                                            }
                                            else {
                                                switch (index.type) {
                                                    case IndexType.UNIQUE:
                                                        indexConfig.unique = true;
                                                        break;
                                                    case IndexType.MULTI_ENTRY:
                                                        indexConfig.multiEntry = true;
                                                        break;
                                                    case IndexType.NORMAL:
                                                        break;
                                                }
                                                store_1.createIndex(index.name, index.name, indexConfig);
                                                logger_1.logger.debug("\u521B\u5EFA".concat(index.type, "\u7D22\u5F15: ").concat(index.name));
                                            }
                                        });
                                        logger_1.logger.debug("\u8868 ".concat(tableName, " \u521B\u5EFA\u6210\u529F\uFF0C\u5171\u521B\u5EFA ").concat(indexes_1.length, " \u4E2A\u7D22\u5F15"));
                                    }
                                    catch (error) {
                                        logger_1.logger.error("\u521B\u5EFA\u8868 ".concat(tableName, " \u5931\u8D25:"), error);
                                        reject(constant_1.default.TB_CREATE_ERROR(error));
                                    }
                                };
                                request.onsuccess = function (event) {
                                    clearTimeout(timeoutId);
                                    var database = event.target.result;
                                    database.close();
                                    resolve(constant_1.default.TB_CREATE_SUCCESS());
                                };
                                request.onerror = function (event) {
                                    clearTimeout(timeoutId);
                                    logger_1.logger.error('创建表失败:', event.target.error);
                                    reject(constant_1.default.TB_CREATE_ERROR(event.target.error));
                                };
                            };
                            setupHandlers(openRequest);
                        })];
                case 3:
                    error_1 = _f.sent();
                    logger_1.logger.error('创建表失败:', error_1);
                    return [2 /*return*/, constant_1.default.TB_CREATE_ERROR(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = createTable;
//# sourceMappingURL=createTable.js.map
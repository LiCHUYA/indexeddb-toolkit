"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var index_1 = tslib_1.__importDefault(require("../constant/index"));
var index_2 = require("../helper/index");
var logger_1 = require("../utils/logger");
/**
 * 使用指定的数据库
 *
 * @param {string} dbName - 数据库名称
 * @param {number} [version] - 可选的版本号
 * @returns {Promise<IDBDatabase>} Promise对象，返回数据库实例
 * @throws {Error} 当数据库操作失败时抛出错误
 */
function useDatabase(dbName, version) {
    var _this = this;
    if (!dbName) {
        throw new Error(index_1.default.DBNAME_IS_NULL().message);
    }
    return new Promise(function (resolve, reject) {
        var handleSuccess = function (event) {
            var target = event.target;
            resolve(target.result);
        };
        var handleVersionError = function (dbName, error) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var existingDB, currentVersion_1, newVersion_1, newRequest_1, currentVersion, newVersion_2, newRequest, error_1;
            var _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        existingDB = (_a = error.target) === null || _a === void 0 ? void 0 : _a.result;
                        if (existingDB) {
                            currentVersion_1 = existingDB.version;
                            existingDB.close();
                            newVersion_1 = version || (currentVersion_1 + 1);
                            logger_1.logger.debug("Upgrading database ".concat(dbName, " from version ").concat(currentVersion_1, " to ").concat(newVersion_1));
                            newRequest_1 = window.indexedDB.open(dbName, newVersion_1);
                            newRequest_1.onsuccess = handleSuccess;
                            newRequest_1.onerror = function (event) {
                                var target = event.target;
                                reject(target.error);
                            };
                            newRequest_1.onupgradeneeded = function (event) {
                                logger_1.logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(newVersion_1));
                                handleSuccess(event);
                            };
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, index_2.getIndexedDBVersion)(dbName)];
                    case 1:
                        currentVersion = _b.sent();
                        newVersion_2 = version || (currentVersion + 1);
                        logger_1.logger.debug("Opening database ".concat(dbName, " with new version ").concat(newVersion_2));
                        newRequest = window.indexedDB.open(dbName, newVersion_2);
                        newRequest.onsuccess = handleSuccess;
                        newRequest.onerror = function (event) {
                            var target = event.target;
                            reject(target.error);
                        };
                        newRequest.onupgradeneeded = function (event) {
                            logger_1.logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(newVersion_2));
                            handleSuccess(event);
                        };
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        logger_1.logger.error("Error handling version change for database ".concat(dbName, ":"), error_1);
                        reject(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        // 首次尝试打开数据库
        var initialRequest = window.indexedDB.open(dbName, version);
        initialRequest.onsuccess = handleSuccess;
        initialRequest.onerror = function (event) {
            var target = event.target;
            var error = target.error;
            if ((error === null || error === void 0 ? void 0 : error.name) === 'VersionError') {
                handleVersionError(dbName, error);
            }
            else {
                logger_1.logger.error("Error opening database ".concat(dbName, ":"), error);
                reject(error);
            }
        };
        initialRequest.onupgradeneeded = function (event) {
            logger_1.logger.debug("Database ".concat(dbName, " upgrade needed to version ").concat(version));
            handleSuccess(event);
        };
    });
}
exports.default = useDatabase;
//# sourceMappingURL=useDatabase.js.map
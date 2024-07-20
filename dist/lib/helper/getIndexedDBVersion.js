"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../constant");
/**
 * 获取指定数据库的版本号
 * @param databaseName 数据库名称
 * @returns Promise对象，包含数据库的版本号
 */
function getIndexedDBVersion(databaseName) {
    return new Promise(function (resolve, reject) {
        if (!databaseName) {
            return constant_1.default.DBNAME_IS_NULL();
        }
        var request = window.indexedDB.open(databaseName);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var version = db.version;
            db.close();
            resolve(version);
        };
        request.onerror = function (event) {
            reject(constant_1.default.BASIC_ERROR(event.target.error));
        };
    });
}
exports.default = getIndexedDBVersion;
//# sourceMappingURL=getIndexedDBVersion.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("../../constant");
/**
 * 删除指定数据库
 * @param dbName 数据库名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteDatabase(dbName) {
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.deleteDatabase(dbName);
        request.onsuccess = function (event) {
            resolve(constant_1.default.DEL_DB_SUCCESS(event));
        };
        request.onerror = function (event) {
            reject(constant_1.default.DEL_DB_ERROR(event.target.error));
        };
    });
}
exports.default = deleteDatabase;
//# sourceMappingURL=deleteDatabase.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
/**
 * 删除指定表
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns Promise对象，包含删除结果的状态和消息
 */
function deleteTable(dbName, tableName) {
    return new Promise(function (resolve, reject) {
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function (event) {
            var db = event.target.result;
            var version = db.version + 1;
            db.close();
            var deleteRequest = window.indexedDB.open(dbName, version);
            deleteRequest.onupgradeneeded = function (event) {
                var upgradeDb = event.target.result;
                if (upgradeDb.objectStoreNames.contains(tableName)) {
                    upgradeDb.deleteObjectStore(tableName);
                }
            };
            deleteRequest.onsuccess = function (event) {
                event.target.result.close();
                resolve(constant_1.default.TB_DELETE_SUCCESS("".concat(tableName, " \u8868\u5220\u9664\u6210\u529F")));
            };
            deleteRequest.onerror = function (event) {
                reject(constant_1.default.TB_DELETE_ERROR(event));
            };
        };
        request.onerror = function (error) {
            reject(constant_1.default.BASIC_ERROR(error));
        };
    });
}
exports.default = deleteTable;
//# sourceMappingURL=deleteTable.js.map
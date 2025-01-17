"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var deleteDatabase_1 = tslib_1.__importDefault(require("../database/deleteDatabase"));
var index_1 = require("../../helper/index");
/**
 * 删除所有数据库
 * @returns Promise对象，包含删除结果的状态和消息
 * @example
 * 该方法请慎重使用。
 */
function deleteAllDatabases() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var allDatabasesResponse, deletePromises, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, (0, index_1.getAllDB)()];
                case 1:
                    allDatabasesResponse = _a.sent();
                    if (!(allDatabasesResponse.result.length > 0)) return [3 /*break*/, 3];
                    deletePromises = allDatabasesResponse.result.map(function (db) { return (0, deleteDatabase_1.default)(db.name); });
                    return [4 /*yield*/, Promise.all(deletePromises)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, constant_1.default.DEL_ALL_DB_SUCCESS()];
                case 3: return [2 /*return*/, constant_1.default.DB_NOTFOUND()];
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.default = deleteAllDatabases;
//# sourceMappingURL=deleteAllDatabases.js.map
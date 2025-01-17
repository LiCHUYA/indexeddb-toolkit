"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var constant_1 = tslib_1.__importDefault(require("../../constant"));
var useDatabase_1 = tslib_1.__importDefault(require("../useDatabase"));
/**
 * 获取指定数据库中的表数量
 * @param dbName 数据库名称
 * @returns Promise对象，包含表名称数组
 */
function getTableNames(dbName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var db, objectStoreNames, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // 检查数据库名称是否为空
                    if (!dbName) {
                        return [2 /*return*/, constant_1.default.DBNAME_IS_NULL()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, useDatabase_1.default)(dbName)];
                case 2:
                    db = _a.sent();
                    objectStoreNames = Array.from(db.objectStoreNames);
                    // 根据对象存储名称列表的长度返回相应的消息
                    if (objectStoreNames.length === 0) {
                        return [2 /*return*/, constant_1.default.GET_TABLES_SUCCESS()];
                    }
                    else {
                        return [2 /*return*/, constant_1.default.GET_TABLES_SUCCESS(objectStoreNames)];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, constant_1.default.BASIC_ERROR(error_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.default = getTableNames;
//# sourceMappingURL=getTableNames.js.map
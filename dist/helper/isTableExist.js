"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var core_1 = require("../core");
/**
 * 判断表是否存在
 * @param dbName 数据库名称
 * @param tableName 表名称
 * @returns 表是否存在的布尔值
 */
function isTableExist(dbName, tableName) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var db, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, core_1.useDatabase)(dbName)];
                case 1:
                    db = _a.sent();
                    return [2 /*return*/, db.objectStoreNames.contains(tableName)];
                case 2:
                    error_1 = _a.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = isTableExist;
//# sourceMappingURL=isTableExist.js.map